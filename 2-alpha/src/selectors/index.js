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

export const getVectorHelpers = createSelector(
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

/*
pseudocode
getMatches = 
[[0 = pos, 8 = length]]
[{pos: 0, length: 8}]
OR
[[2 = pos, 9 = length], [12 = pos, 9 = length]]
[{pos:2, length: 9}, {pos:12, length: 9}]
*/

// const FVErrorsSelector = createSelector(
//   userForwardVectorSelector,
//   hayStackSelector,
//   (FV, haystack) => {
//     const errors = {}
//   })

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
    if(Array.isArray(match)) throw Error('Cannot do, more than one match')
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
    const matchesObjSeqReverse = _.map(matchesObj, (RESite => ({ ...RESite, seq: api.reverse(RESite.seq) })))
    const matches = _.values(matchesObjSeqReverse)
    if (matches.length === 1) {
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
    if (Array.isArray(match)) throw Error('Cannot do, more than one match')
    const result = { ...match }
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