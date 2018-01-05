import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'

export const loadingSelector = state => state.loading

const exercisesListSelector = state => state.exercisesList
const exercisesByIdSelector = state => state.exercisesById
const currentExerciseSelector = state => state.currentExercise

const userForwardVectorSelector = state => state.formInputs.FV
const userForwardGeneSelector = state => state.formInputs.FG
const userRreverseVectorSelector = state => state.formInputs.RV
const userReverseGeneSelector = state => state.formInputs.RG

const restrictionSitesSelector = state => state.restrictionSites

export const getCurrentExercise = createSelector(
  exercisesByIdSelector,
  currentExerciseSelector,
  (allExercises, currentId) => allExercises[currentId]
)

export const getBothHaystackStrands = createSelector(
  getCurrentExercise,
  ( exercise ) => console.log(exercise) || ({
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

export const getUserVectorForward = createSelector(
  userForwardVectorSelector, (input) => input.toUpperCase()
)

// return single object if only one match (user is correct!) or array of matches if matches = 0 or > 1
// READ: when using this function, check for array or object! array = user wrong, object = user right.
export const getUserVectorMatchesForward = createSelector(
  getUserVectorForward,
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
  getUserVectorForward,
  getUserVectorMatchesForward,
  getCurrentExercise,
  (input, match, { vectorStart = false, vector }) => {
    if(Array.isArray(match)) throw Error('Cannot do, more than one match')
    const result = {...match}
    const REMatchPos = result['REMatchPos'] = input.indexOf(match.seq) // XXATAGCGYY (primer) -> 2
    result['leadingSeq']  = input.slice(0, REMatchPos) // XXATAGCGYY (primer)-> XX
    result['trailingSeq'] = input.slice(REMatchPos + match.length) // XXATAGCGYY (primer) -> YY
    result['positionInVector'] = match.pos - result['leadingSeq'].length  // position to put primer relative to vector.
    result['frame'] = vectorStart // false (no required frame, ignore framing errors) or INT
    if(!vectorStart) return result // no required frame -> return now and say we dont need frame here

    result['betweenStartAndREStr'] = vector.slice(vectorStart, match.pos) // ZZZZZATAGCG (vector) -> ZZZZZ
    result['betweenStartAndRE'] = result['betweenStartAndREStr'].length // ZZZZZ -> 5
    result['desiredFrame'] = result['betweenStartAndRE'] % 3
    
    return result
  }
)

export const getVectorFrameStart = createSelector(
  getUserVectorForward,
  getUserVectorMatchesForward,
  getCurrentExercise,
  (input, match, { vectorStart = null, vector }) => {
    if(vectorStart == null) return "In frame!"
    const leadingSeq = input.slice(0, input.indexOf(match.seq))
    const betweenStartAndRE = vector.slice(vectorStart, match.pos)
    const frame = (leadingSeq.length % 3) - (betweenStartAndRE.length % 3 )
    return frame // >= 0 ? frame : (frame + 3) // always positive.
  }
)

