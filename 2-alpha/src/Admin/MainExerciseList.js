import React from 'react'
import { connect } from 'react-redux'

import { updateSortBy } from '../actions/admin'
import { getFilteredSortedExercises } from '../selectors/admin'
import ExercisesList from './ExercisesList'

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state)
})

export default connect(mapStateToProps, dispatch => ({
  sortByName: () => dispatch(updateSortBy('id')),
  sortByCreatedAt: () => dispatch(updateSortBy('createdAt')),
  sortByLastModified: () => dispatch(updateSortBy('lastModified')),
  sortByAuthor: () => dispatch(updateSortBy('authorName')),
}))(ExercisesList)