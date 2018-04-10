import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { SUCCESS, ERROR, INFO } from '../../selectors/evaluator-messages'
import { currentExerciseID, getCurrentStudentID, getCurrentGameCohortID } from '../../selectors'
import { sendAdviceMessage as sendAdviceMessageAction } from '../../actions'
import AdviceMessage from './AdviceMessage'
import { PLight } from '../../components/Text'

export const HidingErrorMessage = styled.li`
  padding: 1.1rem 1.7rem 0.7rem;
  background: #848080;
  color: #DCD9E3;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  hr {
    /* height: ; */
    border-top: 1px solid #A7A7A7;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-right: 0;
    border-left: 0;
    margin-bottom: 1rem;
  }
  p {
    line-height: 1.5rem;
  }
`

export class FailureMessage extends Component {
  state = { showMessage: false }
  inputs = {
    'FV': 'forward primer (vector/additional, top left input)',
    'FG': 'forward primer (SOI annealing, top right input)',
    'RV': 'reverse vector (vector/additional bottom left input)',
    'RG': 'reverse gene (SOI annealing, bottom right input)',
    'FORWARD': 'forward primer (top two inputs)',
    'REVERSE': 'reverse primer (bottom two inputs)',
  }
  showMessage = () => {
    this.setState({ showingMessage: true })
    const {
      title = '',
      additional = '',
      ID = '',
      inputs = []
    } = this.props.message
    this.props.sendAdviceMessage({ title, additional, ID, inputs })
  }
  componentWillReceiveProps(nextProps) {
    /* if the same error appears twice, keep message shown. if different messages, then hide again */
    if(nextProps.message.ID !== this.props.message.ID) this.setState({ showingMessage: false })
  }
  render() {
    const inputsFullName = this.props.message.inputs.map((input) => this.inputs[input])

    if (this.state.showingMessage) {
      return <AdviceMessage message={this.props.message} type={ERROR} />
    } else {
        return (
        <HidingErrorMessage onClick={this.showMessage}>
          <p><strong>Underneath is some advice for {inputsFullName.join(' & ')}</strong></p>
          <hr />
          <p>Clicking this box will display a correction. Don’t use this too often though as every request is saved! </p>
          <p>Instead, try looking at your {inputsFullName.join(' & ')}.</p>
          <p>Or see if your common mistakes contain a hint</p>
        </HidingErrorMessage>
      )
    }
  }
}
FailureMessage.propTypes = {
  message: PropTypes.shape({
    context: PropTypes.any,
    inputs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    ID: PropTypes.string.isRequired,
  })
}


const sendAdviceMessage = (message) => (dispatch, getState) => {
  const state = getState()
  const exerciseID = currentExerciseID(state)
  const studentID = getCurrentStudentID(state)
  const cohortID = getCurrentGameCohortID(state)
  dispatch(sendAdviceMessageAction(studentID, exerciseID, cohortID)(message))
}


export default connect(null, {
  sendAdviceMessage
})(FailureMessage)