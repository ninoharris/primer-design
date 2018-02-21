import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getFilteredSortedExercises } from '../selectors/admin'
import ExercisesList from './ExercisesList'

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state)
})

let EditButton = ({ id }) => (
  <Link className="btn btn-primary" to={`/admin/exercises/edit/${id}`}>Edit exercise</Link>
)

let ExercisesListWithButtons = (props) => {
  return (
    <ExercisesList {...props}>
      <EditButton>Hello world</EditButton>
    </ExercisesList>
  )
}

export default connect(mapStateToProps)(ExercisesListWithButtons)