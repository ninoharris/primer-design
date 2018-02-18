import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addExerciseToCohort } from '../actions/admin'
import { getFilteredSortedExercises } from '../selectors/admin'

import FilterExercises from './FilterExercises'
import ExercisesList from './ExercisesList'

const AddExerciseToCohortButton = ({ id, cohortID, handleClick }) => (
  <button onClick={() => handleClick(cohortID, id)}>Include exercise</button>
)

class AddCohortExercise extends Component {
  state = {
    display: true
  }
  showDisplay = () => this.setState({ display: true })
  hideDisplay = () => this.setState({ display: false })

  render() {
    if(!this.state.display) {
      return <button onClick={this.showDisplay}>Add exercises to cohort</button>
    }
    return (
      <div>
        <FilterExercises />
        <ExercisesList exercisesList={this.props.exercisesList}>
          <AddExerciseToCohortButton cohortID={this.props.cohortID} handleClick={addExerciseToCohort(this.props.cohortID)} />
        </ExercisesList>
        <button className="btn btn-success" onClick={this.hideDisplay}>Done</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const allExercises = getFilteredSortedExercises(state) //, (v) => v.id) // get all exercises which follow filters
  console.log('allExercises', allExercises)
  console.log('ownProps.exerciseIDs', ownProps.exerciseIDs)
  const exercisesNotAdded = allExercises.filter(exercise => !_.has(ownProps.exerciseIDs, exercise.id))
  console.log(exercisesNotAdded)
  return {
    exercisesList: exercisesNotAdded
  }
}

export default connect(mapStateToProps, { addExerciseToCohort })(AddCohortExercise)