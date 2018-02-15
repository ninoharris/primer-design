import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'

export const loadingSelector = state => state.fetchingExercises
export const showCodons = state => state.showCodons
export const showAdminEvaluation = state => state.showAdminEvaluation
export const getAllRestrictionSites = state => state.restrictionSites

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById
export const currentExerciseSelector = state => state.currentExercise

export const getMultilineWidth = state => state.charMultilineWidth
export const getExercise = (state, { id }) => state.exercisesById[id]

export const getCurrentStudentID = state => state.currentStudentID

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
  ({ questionPart1, questionPart2 }) => ({ questionPart1, questionPart2 })
)

export const getVectorRestrictionSites = createSelector(
  restrictionSitesSelector,
  getBothVectorStrands,
  (RESites, { forward }) => {
    return api.getRestrictionSiteMatches(forward)
    // 20: { pos: 20, name: 'X', seq: 'AAAAAA' }
  }
)

export const getHaystackForwardRestrictionSites = createSelector(
  getBothHaystackStrands,
  ({ forward }) => {
    return api.getRestrictionSiteMatches(forward)
  }
)

export const getHaystackReverseRestrictionSites = createSelector(
  getBothHaystackStrands,
  ({ reverse }) => {
    return api.getRestrictionSiteMatches(reverse)
  }
)

export const getVectorHelpers = createSelector( // merges RESites and user-added helpers
  getCurrentExercise,
  getVectorRestrictionSites,
  ({ helpers }, RESites = []) => ([..._.flatMap(helpers, helper => helper), ...RESites ]).sort((a,b) => a.pos - b.pos)
)

export const getTroubleshooter = state => state.troubleshooter
export const FV_TS = createSelector(getTroubleshooter, (TS) => TS.FV)