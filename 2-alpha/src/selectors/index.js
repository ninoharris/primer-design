import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'
import { messages as MSG } from './messages'
import { shotgunComplementMatch } from '../api';

export const loadingSelector = state => state.loading
export const showCodons = state => state.showCodons

export const exercisesListSelector = state => state.exercisesList
const exercisesByIdSelector = state => state.exercisesById
const currentExerciseSelector = state => state.currentExercise


const uFV = state => state.formInputs.FV
const uFG = state => state.formInputs.FG
const uRV = state => state.formInputs.RV
const uRG = state => state.formInputs.RG

export const getUFV = createSelector(uFV, (seq) => seq.toUpperCase())
export const getUFG = createSelector(uFG, (seq) => seq.toUpperCase())
export const getURV = createSelector(uRV, (seq) => seq.toUpperCase())
export const getURVHund80 = createSelector(getURV, seq => api.hund80(seq))
export const getURVReverse = createSelector(getURV, seq => api.reverse(seq))
export const getURG = createSelector(uRG, (seq) => seq.toUpperCase())
export const getURGHund80 = createSelector(getURG, seq => api.hund80(seq))
export const getURGReverse = createSelector(getURG, seq => api.reverse(seq))

const restrictionSitesSelector = state => state.restrictionSites

export const getCurrentExercise = createSelector(
  exercisesByIdSelector,
  currentExerciseSelector,
  (allExercises, currentId) => ({ ...allExercises[currentId] })
)

export const getBothHaystackStrands = createSelector(
  getCurrentExercise,
  ( exercise ) => /* console.log(exercise) || */
  ({
    forward: exercise.haystack,
    reverse: api.complementFromString(exercise.haystack)
  })
)

export const getBothVectorStrands = createSelector(
  getCurrentExercise,
  ({ vector }) => ({
    forward: vector,
    reverse: api.complementFromString(vector)
  })
)
export const getForwardVectorStrand = createSelector(
  getBothVectorStrands,
  ({ forward }) => forward
)
export const getReverseVectorStrand = createSelector(
  getBothVectorStrands,
  ({ reverse }) => reverse
)

export const getQuestion = createSelector(
  getCurrentExercise,
  ({ question }) => question
)

export const getVectorRestrictionSites = createSelector(
  restrictionSitesSelector,
  getBothVectorStrands,
  (RESites, { forward, reverse }) => {
    return api.getRestrictionSiteMatches(RESites, forward)
    // 20: { pos: 20, name: 'X', seq: 'AAAAAA' }
  }
)

export const getVectorHelpers = createSelector( // merges RESites and user-added helpers
  getCurrentExercise,
  getVectorRestrictionSites,
  ({helpers}, RESites) => {
    // console.log(helpers, RESites)
    const REHelpers = _.mapValues(RESites, ({ name, seq, pos, color = '#CCCCCC'}) => ({
      name, seq, pos, len: seq.length, color
    }))
    return {
      ...REHelpers,
      ...helpers,
    }
  }
  // returns object of pos: { name, pos, len, color }
)

// return single object if only one match (user is correct!) or array of matches if matches = 0 or > 1
// READ: when using this function, check for array or object! array = user wrong, object = user right.
export const getUserVectorMatchesForward = createSelector(
  getUFV,
  getVectorRestrictionSites,
  (input, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => input.includes(RESite.seq))
    const matches = _.values(matchesObj)
    if(matches.length === 1) {
      return matches[0] 
    }
    return matches
  }
)


export const getUserVectorMatchForwardAlignment = createSelector(
  getUFV,
  getUserVectorMatchesForward,
  getCurrentExercise,
  (input, match, { vectorStart = false, vector }) => {
    if (Array.isArray(match)) return false // Only works if one match
    const result = {...match}
    const REMatchPos = result['REMatchPos'] = input.indexOf(match.seq) // XXATAGCGYY (primer) -> 2
    result['leadingSeq']  = input.slice(0, REMatchPos) // XXATAGCGYY (primer)-> XX
    result['trailingSeq'] = input.slice(REMatchPos + match.seq.length) // XXATAGCGYY (primer) -> YY
    result['positionInVector'] = match.pos - result['leadingSeq'].length  // position to put primer relative to vector.
    result['endPos'] = result['positionInVector'] + input.length
    result['frame'] = vectorStart // false (no required frame, ignore framing errors) or INT
    if(!vectorStart) return result // no required frame -> return now and say we dont need frame here

    result['betweenStartAndREStr'] = vector.slice(vectorStart, match.pos) // ZZZZZATAGCG (vector) -> ZZZZZ
    result['betweenStartAndRE'] = result['betweenStartAndREStr'].length // ZZZZZ -> 5
    result['toGetDesiredFrame'] = (3 - (result['betweenStartAndRE'] % 3) % 3)
    
    return result
  }
)

export const getUserVectorMatchesReverse = createSelector(
  getURVHund80,
  getVectorRestrictionSites,
  (input, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => input.includes(RESite.seq))
    const matchesObjSeqReverse = _.map(matchesObj, (RESite => ({ ...RESite, seq: api.reverse(RESite.seq) }) ))
    const matches = _.values(matchesObjSeqReverse)
    if (matches.length === 1) { // only one match, return the match object
      return matches[0]
    }
    return matches
  }
)

export const getUserVectorMatchReverseAlignment = createSelector(
  getURVReverse,
  getUserVectorMatchesReverse,
  getCurrentExercise,
  // getUserVectorMatchForwardAlignment,
  (input, match, { vectorEnd = false, vector }, forwardMatch) => {
    if (Array.isArray(match)) return false
    const result = { ...match } // immutable
    const REMatchPos = result['REMatchPos'] = input.indexOf(match.seq) // XXATAGCGYY (primer) -> 2
    result['leadingSeq'] = input.slice(REMatchPos + match.seq.length) // XXATAGCGYY (primer)-> XX
    result['trailingSeq'] = input.slice(0, REMatchPos) // XXATAGCGYY (primer) -> YY
    result['positionInVector'] = match.pos - result['trailingSeq'].length // position to put primer relative to vector.
    result['frame'] = vectorEnd // false (no required frame, ignore framing errors) or INT
    if (!vectorEnd) return result // no required frame -> return now and say we dont need frame here

    result['betweenEndAndREStr'] = vector.slice(match.pos + 6, vectorEnd) // ATAGCGZZZZZ (vector) -> ZZZZZ
    result['betweenEndAndRE'] = result['betweenEndAndREStr'].length // ZZZZZ -> 5
    result['toGetDesiredFrame'] = (3 - (result['betweenEndAndRE'] % 3)) % 3
    
    // result['afterForwardPrimer'] = result['positionInVector'] > forwardMatch.endPos // Boolean
    // result['tooCloseToForward'] = (result['positionInVector'] - forwardMatch.endPos) < 4 // Int.

    return result
  }
)

export const getHaystackForwardMatches = createSelector(
  getUFG,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, { forward }, { constructStart }) => {
    const forwardMatches = {
      rightSeq: forward.substr(constructStart, input.length),
      input,
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos: constructStart,
      endPos: constructStart + input.length,
      // ...api.containsMatch({ haystack: forward, query: input, pos: constructStart })
      ...api.shotgunAllPotentialMatches({ haystack: forward, query: input, pos: constructStart })
    }
    return forwardMatches
  }
)

export const getHaystackReverseMatches = createSelector(
  getURGReverse,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, {reverse}, { constructEnd }) => {
    // for this, we keep the haystack the same and reverse the users input. Substring the haystack by the input length for checking.
    const pos = constructEnd - input.length
    const reverseMatches = { 
      input,
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos,
      endPos: constructEnd,
      ...api.containsMatch({ haystack: reverse, query: input, pos: pos }),
    }
    return reverseMatches
  }
)

// function that returns an object which can be used to createMessage directly, or through a shorthand:
// First create a category and assign it to a variable: const myCategory = createCategory('myCat')
// Then call the success/failure fns: myCategory.success(msg) myCategory.failure(msg)
const createEvaluation = () => {
  const state = []
  let anyErrors = false
  const createMessage = ({ inputs, success, messageID, meta }) => {
    if (!inputs) throw Error('Missing inputs in createMessage.')
    if (!messageID) throw Error('Missing messageID in createMessage.')
    state.push({ inputs, success, ID: messageID, meta })
    if(success === false) anyErrors = true
    return // to send back true or false or null here?
  }
  const getEvaluation = () => console.log('getEvaluation called: ', state) || state
  const hasErrors = () => anyErrors

  const createCategory = (...inputs) => ({ // inputs include:
    success: (messageID, meta) => createMessage({ inputs, messageID, meta, success: true }),
    failure: (messageID, meta) => createMessage({ inputs, messageID, meta, success: false })
  })
  
  return {
    getEvaluation,
    createCategory,
    createMessage,
    hasErrors,
  }
}

export const getHaystackEvaluations = (state) => {
  // set up
  const Eval = createEvaluation()
  const EvalFG = Eval.createCategory('FG')
  const EValRG = Eval.createCategory('RG')
  const FG = getHaystackForwardMatches(state)
  const RG = getHaystackReverseMatches(state)

// TODO: MUCH OF THIS LOGIC SHOULDNT BE HERE AND SHOULD BE DONE BEFOREHAND in getHaystack____Matches.

  // check if right completely (and frame)
  if(FG.rightSeq) EvalFG.success('FORWARD_HAYSTACK_MATCH')
  // put below somewhere else!
  // if(typeof api.shotgunMatch(FG.attempt) === 'number') EvalFG.failure('FORWARD_HAYSTACK_OUT_OF_FRAME')
  // check if wrong strand (and frame)
  // if(shotgunComplementMatch)
  // check if wrong direction (and frame)

  // check if right completely (and frame)
  // check if wrong strand (and frame)
  // check if wrong direction (and frame)

  // go to vector evaluations!
  return Eval.getEvaluation()
}

export const getVectorEvaluations = (state) => {
  const Eval = createEvaluation()
  const EvalFV = Eval.createCategory('FV')
  const EvalRV = Eval.createCategory('RV')
  const FVRV = Eval.createCategory('RV', 'FV')

  // vector matches must be a *single* object before any continuing further to avoid conflicts.
  const FVPrelim = getUserVectorMatchesForward(state)
  const RVPrelim = getUserVectorMatchesReverse(state)

  // No match
  if (FVPrelim.length === 0) EvalFV.failure("NO_MATCH_FV")
  if (RVPrelim.length === 0) EvalRV.failure("NO_MATCH_RV")
  if (Eval.hasErrors()) return Eval.getEvaluation()

  // Too many matches
  if (Array.isArray(FVPrelim)) EvalFV.failure("EXCEED_MATCH_FV")
  if (Array.isArray(RVPrelim)) EvalRV.failure("EXCEED_MATCH_RV")
    
  if (Eval.hasErrors()) return Eval.getEvaluation() // return now as both are required to be a single match before continuing
  FVRV.success("EACH_VECTOR_PRIMER_MATCHES_ONCE")

  // TODO: either restriction site matches inside haystack:





  // Set up invidual matches
  const FV = getUserVectorMatchForwardAlignment(state)
  const RV = getUserVectorMatchReverseAlignment(state)

  // Spacing between primers
  if (FV.endPos >= RV.pos) FVRV.failure("VECTOR_OVERLAP")
  if ((RV.pos - FV.endPos) <= 4) FVRV.failure("VECTORS_TOO_CLOSE")

  if (Eval.hasErrors()) return Eval.getEvaluation()
  FVRV.success("VECTOR_PRIMERS_APART")

  // does Forward primer need a start codon in this exercise, if so:
    // no: check in-frame with constructStart and vectorStart
    // yes: check in-frame with constructStart and placed start codon


  // does Reverse primer need a stop codon in this exercise, if so:
    // no: check in-frame with constructEnd and vectorEnd
    // yes: check in-frame with constructEnd and placed stop codon
  // 
  return Eval.getEvaluation()
}

