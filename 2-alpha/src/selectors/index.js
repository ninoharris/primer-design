import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'

export const loadingSelector = state => state.loading

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
  (allExercises, currentId) => allExercises[currentId]
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
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos: constructStart,
      endPos: constructStart + input.length,
      ...api.containsMatch({ haystack: forward, query: input, pos: constructStart })
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
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos,
      endPos: constructEnd,
      ...api.containsMatch({ haystack: reverse, query: input, pos: pos }),
    }
    return reverseMatches
  }
)

// export const combineSingleVectorMatches = createSelector(
//   getUserVectorMatchForwardAlignment,
//   getUserVectorMatchReverseAlignment,
//   (forward, reverse) => {

//   }
// )

const success = (message, input = null) => ({
  success: true, input, message
})

const failure = (message, additional = null, inputs = null, ...actions) => {
  inputs = (Array.isArray(inputs) || inputs === null) ? inputs : [inputs]
  return {
    success: false, inputs, additional, message
  }
}

// const evaluation = {
//   state = [],
//   success(inputs, message, additional) {
//     state.push({
//       success: true,
//       inputs,
//       message,
//       additional,
//     })
//   }
//   failure(inputs, )
// }

export const getVectorEvaluations = (state) => {
  // make an evaluation array, fill it up with success/failure messages and return it.
  const evaluation = []
  // vector match must be a single objects before any continuing further to avoid conflicts.
  const FVPrelim = getUserVectorMatchesForward(state)
  const RVPrelim = getUserVectorMatchesReverse(state)

  // No match
  if (FVPrelim.length === 0) evaluation.push(failure('Forward primer has no matches in vector.',
  `Choose a restriction site towards the left, and use its 5'-3' sequence on the leading strand.`, 'FV'))
  if (RVPrelim.length === 0) evaluation.push(failure('Reverse primer has no matches in vector.', 
  `Choose a restriction site towards the right, and use its 5'-3' sequence.`, 'RV'))
  if (evaluation.length > 0) return evaluation

  // Too many matches
  if (Array.isArray(FVPrelim)) evaluation.push(failure('Forward primer matches more than one restriction site.', 'FV'))
  if (Array.isArray(RVPrelim)) evaluation.push(failure('Reverse primer matches more than one restriction site.', 'RV'))
    
  if(evaluation.length > 0) return evaluation // return now as both are required to be a single match before continuing
  evaluation.push(success('Vector: Each primer only matches one restriction site'))

  // Set up invidual matches
  const FV = getUserVectorMatchForwardAlignment(state)
  const RV = getUserVectorMatchReverseAlignment(state)

  // Spacing between primers
  if (FV.endPos >= RV.pos) evaluation.push(failure('Vector: Reverse primer cannot overlap forward primer.'))
  if ((RV.pos - FV.endPos) <= 4) evaluation.push(failure('Vector: Primers are too close', 'RV', 
  'Pick a forward restriction site more to the left or Reverse right.'))

  return evaluation
}

