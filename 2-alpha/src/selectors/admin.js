import _ from 'lodash'
import { createSelector } from 'reselect'

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById

export const sortOrderSelector = state => state.sortOrder
export const sortBySelector = state => state.sortBy
export const filterTextSelector = state => state.filterText
export const showLoggedInExercisesOnly = state => state.showLoggedInExercisesOnly

export const getAuthors = state => state.authors
export const getAuthorsList = createSelector(
  getAuthors,
  (authors) => _.flatMap(authors, (val, key) => key)
)
export const getCurrentAuthorUid = state => state.currentAdminId
export const getCurrentAuthor = createSelector(
  getCurrentAuthorUid,
  getAuthors,
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
  getAuthors,
  getCurrentAuthorUid,
  (IDsList, exercisesById, filterText, sortBy, loggedInExercisesOnly, authors, getCurrentAuthorUid) => {
    filterText = filterText.toLowerCase()
    let filteredExercises = IDsList
      .map((id) => {
        const exercise = exercisesById[id]
        console.log(authors) // TODO: reduce calls to author getting.
        const authorName = authors[exercise.authorId] ? authors[exercise.authorId].name : 'anonymous'
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