import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'

// all collections of data are presented as objects, unless the selector is followed by 'List' in which case it is an array.

export const loadingSelector = state => state.fetchingExercises
export const showCodons = state => state.showCodons
export const showAdminEvaluation = state => state.showAdminEvaluation
export const getAllRestrictionSites = state => state.restrictionSites
export const getEditingGameInputs = state => state.editingInputs

export const exercisesByIdSelector = state => state.exercisesById
export const exercisesListSelector = createSelector( // array of exercises
  exercisesByIdSelector,
  (exercises) => Object.keys(exercises)
)

export const getMultilineWidth = state => state.charMultilineWidth
export const getExercise = (state, { id }) => state.exercisesById[id]

export const getCurrentStudentID = state => state.currentStudentID
export const getCurrentStudentProfile = state => state.currentStudent
export const getCurrentGameCohortID = createSelector(
  getCurrentStudentProfile,
  (studentProfile) => studentProfile.cohortID
)
export const getCohortExercises = state => state.cohortExerciseList

export const currentExerciseID = state => state.currentExercise
export const getAllAttemptedExercises = createSelector( // returns object of {exID: { completed: BOOL, attempts: {} }}
  getCurrentStudentProfile,
  (student) => student.exercises 
)
export const getCompletedExercises = createSelector(
  getAllAttemptedExercises,
  (attemptedExercises = {}) => _.pickBy(attemptedExercises, (val) => val.completed)
)
export const getCompletedExercisesList = createSelector(
  getCompletedExercises,
  (completedExercises = {}) => Object.keys(completedExercises)
)
export const getUnattemptedExercises = createSelector( // returns object
  getCohortExercises,
  getAllAttemptedExercises,
  (allCohortExercises = {}, attemptedExercises = {}) => _.omit(allCohortExercises, Object.keys(attemptedExercises))
)
export const getUnattemptedExercisesList = createSelector( // get array
  getUnattemptedExercises,
  (exercises = {}) => Object.keys(exercises)
)
// export const getAttemptedButNotCompletedExercises = createSelector(
//   getAllAttemptedExercises,
//   getCompletedExercises,
//   (attempted = {}, completed = {}) => _.omit(attempted, _.completed)
// )
// export const getAttemptedButNotCompletedExercisesList = createSelector(
//   getAttemptedButNotCompletedExercises,
//   (exercises = {}) => Object.keys(exercises)
// )
export const getAvailableExercisesList = createSelector(
  getCohortExercises,
  getCompletedExercises,
  (all, completed) => Object.keys(_.omit(all, ...Object.keys(completed)))
)

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
  currentExerciseID,
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
    return api.getRestrictionSiteMatches(forward) // get array
  }
)

export const getHaystackRestrictionSites = createSelector(
  getBothHaystackStrands,
  ({ forward, reverse }) => {
    return [...api.getRestrictionSiteMatches(forward), ...api.getRestrictionSiteMatches(reverse).map(site => ({ ...site, direction: 'reverse' })) ]
  }
)

export const getVectorHelpers = createSelector( // merges RESites and user-added helpers
  getCurrentExercise,
  getVectorRestrictionSites,
  ({ helpers }, RESites = []) => ([..._.flatMap(helpers, helper => helper), ...RESites ]).sort((a,b) => a.pos - b.pos)
)

export const getTroubleshooter = state => state.troubleshooter
export const FV_TS = createSelector(getTroubleshooter, (TS) => TS.FV)
