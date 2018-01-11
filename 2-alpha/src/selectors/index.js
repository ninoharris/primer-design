import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'
import { messages as MSG } from './messages'
import { shotgunComplementMatch, isTooShort, complementFromString, reverse } from '../api';

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

export const getUserVectorMatchForward = createSelector(
  getUFV,
  getCurrentExercise,
  getVectorRestrictionSites,
  (input, { vectorStart = false, vector }, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => input.includes(RESite.seq))
    const matches = _.values(matchesObj)
    if (matches.length !== 1) {
      return { matches, multipleMatches: true }
    }
    const match = matches[0]
    const singleMatch = { ...match}
    // console.log('getUserVectorMatchForward', input, match)
    const REMatchPos = singleMatch['REMatchPos'] = input.indexOf(match.seq) // XXATAGCGYY (primer) -> 2
    singleMatch['leadingSeq']  = input.slice(0, REMatchPos) // XXATAGCGYY (primer)-> XX
    singleMatch['trailingSeq'] = input.slice(REMatchPos + match.seq.length) // XXATAGCGYY (primer) -> YY
    singleMatch['positionInVector'] = match.pos - singleMatch['leadingSeq'].length  // position to put primer relative to vector.
    singleMatch['endPos'] = singleMatch['positionInVector'] + 6
    singleMatch['frame'] = vectorStart // false (no required frame, ignore framing errors) or INT
    if(!vectorStart) return singleMatch // no required frame -> return now and say we dont need frame here
    console.log('Start of vector and RE match:', vectorStart, match.pos)
    singleMatch['betweenStartAndREStr'] = vector.substring(vectorStart - 1, match.pos) // ZZZZZATAGCG (vector) -> ZZZZZ
    singleMatch['betweenStartAndRE'] = singleMatch['betweenStartAndREStr'].length // ZZZZZ -> 5
    singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenStartAndRE'] % 3) % 3
    
    

    return { singleMatch }
  }
)

// export const getUserVectorMatchesReverse = createSelector(
//   getURVHund80,
//   getVectorRestrictionSites,
//   (input, RESites) => {
//     const matchesObj = _.pickBy(RESites, (RESite) => input.includes(RESite.seq))
//     const matchesObjSeqReverse = _.map(matchesObj, (RESite => ({ ...RESite, seq: api.reverse(RESite.seq) }) ))
//     const matches = _.values(matchesObjSeqReverse)
//     if (matches.length === 1) { // only one match, return the match object
//       return matches[0]
//     }
//     return matches
//   }
// )
// let x = 'ATGCATGCGGG'
// console.log(x, reverse(x), complementFromString(x), reverse(complementFromString(x)))

export const getUserVectorMatchReverse = createSelector(
  getURVHund80,
  getURVReverse,
  getCurrentExercise,
  getVectorRestrictionSites,
  (inputHund80, input, { vectorEnd = false, vector }, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => inputHund80.includes(RESite.seq))
    const matchesObjSeqReverse = _.map(matchesObj, (RESite => ({ ...RESite, seq: api.reverse(RESite.seq) })))
    const matches = _.values(matchesObjSeqReverse)
    if (matches.length !== 1) {
      return { matches, multipleMatches: true }
    }
    const match = matches[0]
    const singleMatch = { ...match }

    const REMatchPos = singleMatch['REMatchPos'] = input.indexOf(match.seq) // XXATAGCGYY (primer) -> 2
    singleMatch['leadingSeq'] = input.slice(REMatchPos + match.seq.length) // 5'-XXATAGCGYY-3' = 3'-YYGCGATAXX-5' (primer)-> XX
    singleMatch['trailingSeq'] = input.slice(0, REMatchPos) // XXATAGCGYY (primer) -> YY
    singleMatch['positionInVector'] = singleMatch['pos'] - singleMatch['trailingSeq'].length // position to put primer relative to vector.
    singleMatch['frame'] = vectorEnd // false (no required frame, ignore framing errors) or INT
    if (!vectorEnd) return singleMatch // no required frame -> return now and say we dont need frame here

    singleMatch['betweenEndAndREStr'] = vector.slice(match.pos + 6, vectorEnd + 1) // ATAGCGZZZZZ (vector) -> ZZZZZ
    singleMatch['betweenEndAndRE'] = singleMatch['betweenEndAndREStr'].length // ZZZZZ -> 5
    singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenEndAndRE'] % 3) % 3

    return { singleMatch }
  }
)

export const getHaystackForwardMatches = createSelector(
  getUFG,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, { forward }, { constructStart }) => {
    if(input.length < 4) return {}
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
    // console.log('Haystack reverse')
    if (input.length < 4) return {}
    // for this, we keep the haystack the same and reverse the users input. Substring the haystack by the input length for checking.
    const pos = constructEnd - input.length
    const reverseMatches = { 
      input,
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos,
      endPos: constructEnd,
      ...api.shotgunAllPotentialMatches({ haystack: reverse, query: input, pos: pos }),
    }
    return reverseMatches
  }
)

// function that returns an object which can be used to createMessage directly, or through a shorthand:
// First create a category and assign it to a variable: const myCategory = createCategory('myCat')
// Then call the success/failure fns: myCategory.success(msg) myCategory.failure(msg)
const createEvaluation = (...initialStates) => {
  const state = Array.isArray(initialStates) ? initialStates.reduce((p,c) => [...p, ...c], []) : []
  let anyErrors = false
  const createMessage = ({ inputs, success, messageID, context }) => {
    if (!inputs) throw Error('Missing inputs in createMessage.')
    if (!messageID) throw Error('Missing messageID in createMessage.')
    state.push({ inputs, success, ID: messageID, context })
    if(success === false) anyErrors = true
    return // to send back true or false or null here?
  }
  const getEvaluation = () => {
    // console.log('getEvaluation called: ', state)
    return state
  }
  const hasErrors = () => anyErrors

  const createCategory = (...inputs) => ({ // inputs include:
    success: (messageID, context) => createMessage({ inputs, messageID, context, success: true }),
    failure: (messageID, context) => createMessage({ inputs, messageID, context, success: false })
  })
  
  return {
    getEvaluation,
    createCategory,
    createMessage,
    hasErrors,
  }
}

// evaluations which are independent of vector input
export const getHaystackEvaluations = createSelector(
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (FG, RG) => {
  // set up
  const Eval = createEvaluation()
  const EvalFG = Eval.createCategory('FG')
  const EvalRG = Eval.createCategory('RG')

  // check if right completely (and frame)
  if(FG.input) {
    if (isTooShort(FG.input)) EvalFG.failure('FORWARD_TOO_SHORT')
    if (FG.normalMatch) EvalFG.success('FORWARD_HAYSTACK_MATCH')
    if (FG.complementMatch) EvalFG.failure('FORWARD_WRONG_STRAND')
    if (FG.reverseMatch) EvalFG.failure('FORWARD_WRONG_DIRECTION')
    if (FG.frame && FG.frame !== 0) EvalFG.failure('FORWARD_HAYSTACK_OUT_OF_FRAME', FG.frame)
    if (!FG.normalMatch && !FG.complementMatch && !FG.reverseMatch) EvalFG.failure("FORWARD_NO_MATCH")
  }
  
  if(RG.input) {
    if (isTooShort(RG.input)) EvalRG.failure('REVERSE_TOO_SHORT')
    if (RG.normalMatch) EvalRG.success('REVERSE_HAYSTACK_MATCH')
    if (RG.complementMatch) EvalRG.failure('REVERSE_WRONG_STRAND')
    if (RG.reverseMatch) EvalRG.failure('REVERSE_WRONG_DIRECTION')
    if (RG.frame && RG.frame !== 0) EvalRG.failure('REVERSE_HAYSTACK_OUT_OF_FRAME', RG.frame)
    if (!RG.normalMatch && !RG.complementMatch && !RG.reverseMatch) EvalRG.failure("REVERSE_NO_MATCH")
  }
  // go to vector evaluations!
  return Eval.getEvaluation()
})

// evaluations which are independent of haystack input
export const getVectorEvaluations = createSelector(
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  (FV, RV) => {
  const Eval = createEvaluation()
  const EvalFV = Eval.createCategory('FV')
  const EvalRV = Eval.createCategory('RV')
  const FVRV = Eval.createCategory('RV', 'FV')

  // No match
  if (FV.matches && FV.matches.length === 0) EvalFV.failure("NO_MATCH_FV")
  if (RV.matches && RV.matches.length === 0) EvalRV.failure("NO_MATCH_RV")
  if (Eval.hasErrors()) return Eval.getEvaluation()

  // Too many matches
  if (FV.matches) EvalFV.failure("EXCEED_MATCH_FV")
  if (RV.matches) EvalRV.failure("EXCEED_MATCH_RV")
    
  if (Eval.hasErrors()) return Eval.getEvaluation() // return now as both are required to be a single match before continuing
  FVRV.success("EACH_VECTOR_PRIMER_MATCHES_ONCE")

  // For readability
  FV = FV.singleMatch
  RV = RV.singleMatch 
  
  // TODO: either restriction site matches inside haystack:
  // Spacing between primers
  if (FV.endPos >= RV.pos) FVRV.failure("VECTOR_OVERLAP")
  const differenceBetweenVectorPrimers = RV.pos - FV.endPos
  if (differenceBetweenVectorPrimers <= 4) FVRV.failure("VECTORS_TOO_CLOSE", differenceBetweenVectorPrimers)

  if (Eval.hasErrors()) return Eval.getEvaluation()
  FVRV.success("VECTOR_PRIMERS_APART")


  return Eval.getEvaluation()
})

// evaluations which depend on both haystack and vector
export const getAllEvaluations = createSelector(
  getVectorEvaluations,
  getHaystackEvaluations,
  getCurrentExercise,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (EvalVector, EvalHaystack, exercise, FV, RV, FG, RG) => {
    const Eval = createEvaluation(EvalHaystack, EvalVector)
    const EvalFV = Eval.createCategory('FV')
    const EvalRV = Eval.createCategory('RV')
    
    if(!FV.singleMatch || !RV.singleMatch) return Eval.getEvaluation()

    // does Forward primer need a start codon in this exercise, if so:
    if (FG.isExact && FG.normalMatch) {
      const needsStartCodon = !exercise.vectorStart

      if (needsStartCodon) {
        // yes: check in-frame with constructStart and placed start codon

      } else {
        // no: check in-frame with constructStart and vectorStart
        const diffBetweenForwardFrameAndDesired = (FV.singleMatch.toGetDesiredFrame - FV.singleMatch.trailingSeq.length)
        if (diffBetweenForwardFrameAndDesired === 0) {
          EvalFV.success('FORWARD_BOTH_IN_FRAME')
        } else {
          EvalFV.failure('FORWARD_BOTH_OUT_OF_FRAME', diffBetweenForwardFrameAndDesired)
        }
      }
    }

    if (RG.isExact && RG.normalMatch) {
      const needsStopCodon = !exercise.vectorEnd
      // does Reverse primer need a stop codon in this exercise, if so:
      if (needsStopCodon) {
        console.log('Needs stop codon')
      } else {
        const diffBetweenReverseFrameAndDesired = (RV.singleMatch.toGetDesiredFrame - RV.singleMatch.trailingSeq.length)
        if (diffBetweenReverseFrameAndDesired === 0) {
          EvalRV.success('REVERSE_BOTH_IN_FRAME')
        } else {
          EvalRV.failure('REVERSE_BOTH_OUT_OF_FRAME', diffBetweenReverseFrameAndDesired)
        }
      }
    }

    // no: check in-frame with constructEnd and vectorEnd
    // yes: check in-frame with constructEnd and placed stop codon

    return Eval.getEvaluation()
    
})