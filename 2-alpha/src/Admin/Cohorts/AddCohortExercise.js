import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addExerciseToCohort } from '../../actions/admin'
import { getFilteredSortedExercisesNotInCohort } from '../../selectors/admin'

import ExercisesList from '../ExercisesList'
import { TitleNoMargins } from '../../components/Text'
import { HighlightLink } from '../../components/Link'
import { SecondaryButton } from '../../components/Button'


const AddExerciseToCohortButton = ({ id, cohortID, handleClick }) => (
  <SecondaryButton className="btn btn-success" onClick={() => handleClick(cohortID, id)}>Assign exercise</SecondaryButton>
)

const Container = styled.div`
`

const AddCohortExercise = ({ exercisesList, cohortID, addExerciseToCohort }) => {
  return (
    <Container>
      <ExercisesList exercisesList={exercisesList}>
        <AddExerciseToCohortButton cohortID={cohortID} handleClick={addExerciseToCohort} />
      </ExercisesList>
    </Container>
  )
}
AddCohortExercise.propTypes = {
  cohortID: PropTypes.string.isRequired,
  exercisesList: PropTypes.array.isRequired,
  addExerciseToCohort: PropTypes.func.isRequired,
}

const mapStateToProps = (state, { cohortID }) => {
  return {
    exercisesList: getFilteredSortedExercisesNotInCohort(state, { cohortID })
  }
}



export default connect(mapStateToProps, { addExerciseToCohort })(AddCohortExercise)