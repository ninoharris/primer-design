import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExercisesList from '../ExercisesList'
import { Button } from '../../components/Button'

import { removeExerciseFromCohort } from '../../actions/admin'
import { getExercises } from '../../selectors/admin';

const RemoveCohortExerciseButton = ({ handleClick, cohortID, id }) => (
  <Button onClick={() => handleClick(cohortID, id)}>Unassign exercise</Button>
)

export class CohortExerciseList extends Component {
  render() {
    const { exercises, cohortID, removeExerciseFromCohort } = this.props

    return (
      <ExercisesList exercisesList={_.flatMap(exercises, (v, id) => ({...v, id })) }>
        <RemoveCohortExerciseButton cohortID={cohortID} handleClick={removeExerciseFromCohort} />
      </ExercisesList>
    )
  }
}

const mapStateToProps = (state, { exerciseIDs }) => ({
  exercises: getExercises(state, { exerciseIDs })
})

export default connect(mapStateToProps, { 
  removeExerciseFromCohort
})(CohortExerciseList)