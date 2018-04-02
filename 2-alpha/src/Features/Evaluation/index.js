import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllEvaluations } from '../../selectors/evaluations'

import FailureMessage from './FailureMessage'
import AdviceMessage from './AdviceMessage'

class Evaluation extends Component {
  doActions = (actions = []) => {
    actions.forEach(action => this.props.dispatch(action))
  }

  render() {
    const { advice } = this.props
    const allMessages = advice.getMessages()
    const inputs = advice.getInputs()
    if(!allMessages) return null
    
    // how many messages are displayed for each is arbitrary and can be changed without errors
    const successMessages = advice.getSuccessMessages().reverse().slice(0, 3)
    const errorMessage = advice.getErrorMessages()[0] // get first one
    const infoMessages = advice.getInfoMessages().slice(0, 2)
    // console.dir(failureMessage)
    return (
      <ul className="evaluation-list">
        {errorMessage ? <FailureMessage inputs={inputs} message={errorMessage} />: ''}
        {infoMessages.map((msg, i) => AdviceMessage(msg, i + 1))}
        {successMessages.map((msg, i) => AdviceMessage(msg, i+1))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  advice: getAllEvaluations(state)
})
  

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)