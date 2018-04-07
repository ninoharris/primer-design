import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { getAllEvaluations } from '../../selectors/evaluations'

import { P } from '../../components/Text'
import FailureMessage from './FailureMessage'
import AdviceMessage from './AdviceMessage'

const Container = styled.div`
  background: ${p => transparentize(0.87, p.theme.darkerGrey)};
  flex: 1; /* take up full height of container */
  padding: 1rem;
`

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
      <Container>

        {errorMessage ? <FailureMessage inputs={inputs} message={errorMessage} />: ''}
        {infoMessages.map((msg, i) => AdviceMessage(msg, i + 1))}
        {successMessages.map((msg, i) => AdviceMessage(msg, i+1))}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  advice: getAllEvaluations(state)
})
  

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)