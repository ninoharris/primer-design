import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getQuestion } from '../../selectors'

import Vector from '../Vector'
import Haystack from '../Haystack'
import { P } from '../../components/Text'
import { Circle } from '../../components/SummaryTags'


const Container = styled.div`
  padding-left: 2rem;
`

const Question = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  max-width: 800px;
  margin-top: 1rem;
  ${Circle} {
    height: 35px;
    width: 35px;
  }
  > p {
    margin: 0;
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-weight: bold;
    flex: 1; /* Resize to circle to the left */
  }
`

const HaystackContainer = styled.div`
  flex: 1;
  /* overflow-y: hidden; */
  > div {
    margin-top: -0.5rem;
  }
`

class Display extends Component {
  render() {
    return (
      <Container className="col-12">
        <div /* Invisible div to see width of 100 chars */ className="dummy-sizing"></div>
        <Question>
          <Circle>1</Circle>
          <P>Question part 1: {this.props.questionPart1}</P>
        </Question>
        <Vector />
        <Question>
          <Circle>2</Circle>
          <P>Question part 2: {this.props.questionPart2}</P>
        </Question>
        <HaystackContainer>
          <Haystack />
        </HaystackContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { questionPart1, questionPart2 } = getQuestion(state)
  return { questionPart1, questionPart2 }

}

export default connect(mapStateToProps)(Display)