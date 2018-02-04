import { createSelector } from 'reselect'

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById

export const sortOrderSelector = state => state.sortOrder
export const sortBySelector = state => state.sortBy
export const filterTextSelector = state => state.filterText

export const getFilteredSortedExercises = createSelector(
  exercisesListSelector,
  exercisesByIdSelector,
  filterTextSelector,
  sortBySelector,
  (IDsList, exercisesById, filterText, sortBy, helpers) => {
    filterText = filterText.toLowerCase()

    const filteredExercises = IDsList
      .map(id => ({ ...exercisesById[id], id }))
      .filter(({ questionPart1, questionPart2, authorId, helpers }) => {
        return questionPart1.toLowerCase().includes(filterText) ||
          questionPart2.toLowerCase().includes(filterText) ||
          authorId.toLowerCase().includes(filterText)  // ||
          // if you want to kill yourself, why not try and filter by helpers? loljknahbundat
          // (Array.isArray(helpers) && helpers.includes(helper => helper.name.toLowerCase().includes(filterText)))
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