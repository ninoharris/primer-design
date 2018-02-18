import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addExerciseToCohort } from '../actions/admin'
import { getFilteredSortedExercisesNotInCohort } from '../selectors/admin'

import FilterExercises from './FilterExercises'
import ExercisesList from './ExercisesList'

const AddExerciseToCohortButton = ({ id, cohortID, handleClick }) => (
  <button className="btn btn-success" onClick={() => handleClick(cohortID, id)}>Include exercise</button>
)

class AddCohortExercise extends Component {
  state = {
    display: true
  }
  showDisplay = () => this.setState({ display: true })
  hideDisplay = () => this.setState({ display: false })

  render() {
    if(!this.state.display) {
      return <button className="btn btn-success" onClick={this.showDisplay}>Add exercises to cohort</button>
    }
    return (
      <div>
        <FilterExercises />
        <ExercisesList exercisesList={this.props.exercisesList}>
          <AddExerciseToCohortButton cohortID={this.props.cohortID} handleClick={this.props.addExerciseToCohort} />
        </ExercisesList>
        <button className="btn btn-success" onClick={this.hideDisplay}>Done</button>
      </div>
    )
  }
}
AddCohortExercise.propTypes = {
  cohortID: PropTypes.string.isRequired,
  exercisesList: PropTypes.array.isRequired,
}

const mapStateToProps = (state, { cohortID }) => {
  return {
    exercisesList: getFilteredSortedExercisesNotInCohort(state, { cohortID })
  }
}



export default connect(mapStateToProps, { addExerciseToCohort })(AddCohortExercise)