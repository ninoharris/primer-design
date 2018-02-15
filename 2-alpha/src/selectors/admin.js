import _ from 'lodash'
import { createSelector } from 'reselect'

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById

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
export const basicCohortsArray = state => _.flatMap(state.cohorts, (val, cohortID) => ({ ...val, cohortID }))

export const getStudent = (state, props) => state.studentsById[props.studentID]

export const getExercises = (state, props) => createSelector(
  exercisesListSelector,
  (exercises) => props.exerciseIDs.map(exerciseID => exercises[exerciseID])
)
export const getStudents = (state, props) => state.studentsList


export const getCohorts = createSelector(
  basicCohortsArray,
  authorsById,
  (cohorts, authors) => cohorts.map(cohort => ({...cohort, authorFullName: authors[cohort.authorID].fullName }))
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
  (IDsList, exercisesById, filterText, sortBy, loggedInExercisesOnly, authors, getCurrentAuthorUid) => {
    filterText = filterText.toLowerCase()
    let filteredExercises = IDsList
      .map((id) => {
        const exercise = exercisesById[id]
        console.log(authors) // TODO: reduce calls to author getting.
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