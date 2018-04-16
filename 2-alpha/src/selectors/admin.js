import _ from 'lodash'
import { createSelector } from 'reselect'
import { exercisesListSelector, exercisesByIdSelector} from './index'

export const sortOrderSelector = state => state.sortOrder
export const sortBySelector = state => state.sortBy
export const filterTextSelector = state => state.filterText
export const showLoggedInExercisesOnly = state => state.showLoggedInExercisesOnly

export const authorsById = state => state.authorsById
export const authorsList = state => _.flatMap(state.authorsById, (val, key) => key)
export const getCurrentAuthorUid = state => state.currentAdminId
export const getAuthor = (state, props) => state.authorsById[props.authorID]
export const getAuthorName = createSelector(getAuthor, (author) => author.fullName ? author.fullName : 'anonymous')

export const getCohort = (state, props) => state.cohorts[props.cohortID]
export const getCohortExercises = createSelector(
  getCohort,
  (cohort) => cohort.exerciseIDs
)



export const getAllStudents = (state) => state.studentsById
export const getStudent = createSelector(
  getAllStudents,
  (state, props) => props.studentID,
  (students, studentID) => students[studentID]
)
export const getStudents = createSelector(
  getAllStudents,
  (state, props) => props.studentIDs,
  (students, studentIDs) => console.log(students) || _.pick(students, _.keys(studentIDs))
)

export const getStudentsOverviewList = createSelector(
  getStudents,
  (students) => _.map(students, ({ fullName, createdAt, completedCount, authorID }, studentID ) => ({ createdAt, completedCount, authorID, fullName, studentID }))
)

export const getExercises = createSelector( // takes in an object with exerciseIDs { id1: true, id2: true }, returns an object containing full exercise data
  (state, props) => props.exerciseIDs,
  exercisesByIdSelector,
  authorsById,
  (wantedExercises = {}, allExercises = {}, authorsById = {}) => _.mapValues(wantedExercises, (v, key) => {
    const exercise = allExercises[key]
    const author = authorsById[exercise.authorId]
    const authorName = author ? author.fullName : 'anonymous'
    return { ...exercise, authorName }
  })
)

export const getExercisesSpecificFields = createSelector(
  (state, props) => props.fields,
  getExercises,
  (fields = [], exercises) => _.pick(exercises, fields)
)

export const getCohortsMinimal = state => state.cohorts
export const getCohorts = createSelector(
  getCohortsMinimal,
  authorsById,
  (cohorts, authors) => _.mapValues(cohorts, (cohort) => ({...cohort, authorFullName: authors[cohort.authorID].fullName }))
)
export const getRecentCohortID = state => state.recentCohort

export const getRecentCohort = createSelector(
  getRecentCohortID,
  getCohortsMinimal,
  (cohortID, cohorts) => {
    return cohorts[cohortID]
  }
)

export const getAuthorsList = createSelector(
  authorsById,
  (authors) => _.flatMap(authors, (val, key) => key)
)

export const getCurrentAuthor = createSelector(
  getCurrentAuthorUid,
  authorsById,
  (uid, authors) => {
    return authors[uid]
  }
)

export const getFilteredSortedExercises = createSelector(
  exercisesListSelector,
  exercisesByIdSelector,
  filterTextSelector,
  sortBySelector,
  showLoggedInExercisesOnly,
  authorsById,
  getCurrentAuthorUid,
  (IDs, exercisesById, filterText, sortBy, loggedInExercisesOnly, authors, getCurrentAuthorUid) => {
    filterText = filterText.toLowerCase()
    let filteredExercises = IDs
      .map(( id ) => {
        const exercise = exercisesById[id]
        const authorName = authors[exercise.authorId] ? authors[exercise.authorId].fullName : 'anonymous'
        return {...exercise, id, authorName }
      })

    if(filterText.length > 0) {
      filteredExercises = filteredExercises.filter((exercise) => {
        return exercise.questionPart1.toLowerCase().includes(filterText) ||
          exercise.questionPart2.toLowerCase().includes(filterText) ||
          exercise.authorName.toLowerCase().includes(filterText)
      })
    }
    if(loggedInExercisesOnly) {
      filteredExercises = filteredExercises.filter((exercise) => exercise.authorId === getCurrentAuthorUid)
    }
  
    switch (sortBy) {
      case 'authorId':
        return filteredExercises.sort((a, b) =>a.authorId.localeCompare(b.authorId))
      case 'createdAt':
        return filteredExercises.sort((a, b) => b.createdAt - a.createdAt)
      case 'id':
        return filteredExercises.sort((a,b) => a.id - b.id)
      case 'lastModified':
      default: 
        return filteredExercises.sort((a, b) => b.lastModified - a.lastModified)
    }

})

export const getFilteredSortedExercisesCount = createSelector(
  getFilteredSortedExercises,
  (exercises) => exercises.length
)

export const getFilteredSortedExercisesNotInCohort = createSelector(
  getCohortExercises,
  getFilteredSortedExercises,
  (cohortExercises, exercises) => {
    console.log('getFilteredSortedExercisesNotInCohort', cohortExercises, exercises)

    return exercises.filter(exercise => !_.has(cohortExercises, exercise.id))
  }
)

export const getCohortStudents = createSelector(
  getCohort,
  getStudents,
  (cohort, students) => _.pick(students, cohort.studentIDs)
)

export const getCohortCompletionStatuses = createSelector(
  getCohortStudents,
  (cohortStudents) => {
    const completionStatuses = {
      completedCount: 0,
      unfinishedCount: 0,
      notStartedCount: 0,
    }
  }
)