import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getPhase1Ready, getExerciseComplete } from '../../selectors/evaluations'
import { attemptExercise } from '../../actions'

import { CTAButton } from '../../components/Button'

const SubmitExercise = ({ phase1Ready, exerciseComplete, attemptExercise }) => {
  if (phase1Ready) {
    if (exerciseComplete) {
      return (
        <CTAButton onClick={attemptExercise} type="submit" className="btn btn-primary mr-3">
          Submit answer!
        </CTAButton>
      )
    } else {
      return (
        <CTAButton onClick={attemptExercise} type="submit" className="btn btn-primary mr-3">
          Check final considerations
        </CTAButton>
      )
    }
  }
  return null
}

/* reference */
const mapStateToProps = (state) => {
  return {
    phase1Ready: getPhase1Ready(state),
    exerciseComplete: getExerciseComplete(state),
  }
}

export default connect(mapStateToProps, { attemptExercise })(SubmitExercise)