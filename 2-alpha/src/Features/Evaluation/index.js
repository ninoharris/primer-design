import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { getAllEvaluations } from '../../selectors/evaluations'

import { P } from '../../components/Text'
import FailureMessage from './FailureMessage'
import AdviceMessage from './AdviceMessage'
import SubmitExercise from './SubmitExercise'
import { Row } from '../../components/Container'
import { INFO, SUCCESS } from '../../selectors/evaluator-messages';

const Container = styled.div`
  background: ${p => transparentize(0.87, p.theme.darkerGrey)};
  flex: 1; /* take up full height of container */
  padding: 1rem 0 1rem 1rem;
  overflow-y: scroll;
`

const Ul = styled.ul`
  position: relative;
  left: -1rem;
  margin-top: 1rem;
  > li {
    margin-bottom: 1rem;
  }
`

const SubmitExerciseContainer = styled.div`
  padding-right: 1rem;
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
    const successMessages = advice.getSuccessMessages().reverse()
    const errorMessage = advice.getErrorMessages()[0] // get first one
    const infoMessages = advice.getInfoMessages()
    // console.dir(failureMessage)
    return (
      <Container>
        <Row>
          <P><strong>Progress</strong></P>
          <SubmitExerciseContainer><SubmitExercise /></SubmitExerciseContainer>
        </Row>
        <Ul>
          {errorMessage ? <FailureMessage inputs={inputs} message={errorMessage} />: ''}
          {infoMessages.map((msg, i) => <AdviceMessage message={msg} key={i + 1} type={INFO} />)}
          {successMessages.map((msg, i) => <AdviceMessage message={msg} key={i+2} type={SUCCESS} />)}
        </Ul>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  advice: getAllEvaluations(state)
})
  

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)