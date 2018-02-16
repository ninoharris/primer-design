import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateSortBy } from '../actions/admin'
import { getFilteredSortedExercises } from '../selectors/admin'
import ExercisesList, { ExerciseList } from './ExercisesList'

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state)
})

let EditButton = ({ id }) => (
  <Link className="btn btn-primary" to={`/admin/exercises/edit/${id}`}>Edit exercise</Link>
)

let ExercisesListWithButtons = (props) => {
  return (
    <ExerciseList {...props}>
      <EditButton>Hello world</EditButton>
    </ExerciseList>
  )
}

export default connect(mapStateToProps, dispatch => ({
  sortByName: () => dispatch(updateSortBy('id')),
  sortByCreatedAt: () => dispatch(updateSortBy('createdAt')),
  sortByLastModified: () => dispatch(updateSortBy('lastModified')),
  sortByAuthor: () => dispatch(updateSortBy('authorName')),
}))(ExercisesListWithButtons)