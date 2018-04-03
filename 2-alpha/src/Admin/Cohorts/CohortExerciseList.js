import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExercisesList from './ExercisesList'

import { removeExerciseFromCohort } from '../actions/admin'
import { getExercises } from '../selectors/admin';

const RemoveCohortExerciseButton = ({ handleClick, cohortID, id }) => (
  <button className="btn btn-warning" onClick={() => handleClick(cohortID, id)}>Remove from cohort</button>
)

export class CohortExerciseList extends Component {
  render() {
    const { exerciseIDs, cohortID, removeExerciseFromCohort } = this.props

    return (
      <ExercisesList exercisesList={_.flatMap(exerciseIDs, (v, id) => ({...v, id })) }>
        <RemoveCohortExerciseButton cohortID={cohortID} handleClick={removeExerciseFromCohort} />
      </ExercisesList>
    )
  }
}

const mapStateToProps = (state, { exerciseIDs }) => ({
  exerciseIDs: getExercises(state, { exerciseIDs })
})

export default connect(mapStateToProps, { removeExerciseFromCohort })(CohortExerciseList)