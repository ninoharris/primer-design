import _ from 'lodash'
import { createSelector } from 'reselect'

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById

export const sortOrderSelector = state => state.sortOrder
export const sortBySelector = state => state.sortBy
export const filterTextSelector = state => state.filterText

export const getAuthors = state => state.authors
export const getAuthorsList = createSelector(
  getAuthors,
  (authors) => _.flatMap(authors, (val, key) => key)
)
export const getAuthorName = (state, props) => state.authors[props.authorId].name

export const getFilteredSortedExercises = createSelector(
  exercisesListSelector,
  exercisesByIdSelector,
  filterTextSelector,
  sortBySelector,
  getAuthors,
  (IDsList, exercisesById, filterText, sortBy, authors) => {
    filterText = filterText.toLowerCase()

    const filteredExercises = IDsList
      .map((id) => {
        const exercise = exercisesById[id]
        console.log(authors)
        const authorName = authors[exercise.authorId] ? authors[exercise.authorId].name : 'anonymous'
        return {...exercise, id, authorName }
      })
      .filter((exercise) => {
        return exercise.questionPart1.toLowerCase().includes(filterText) ||
          exercise.questionPart2.toLowerCase().includes(filterText) ||
          exercise.authorName.toLowerCase().includes(filterText)
      })
  
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