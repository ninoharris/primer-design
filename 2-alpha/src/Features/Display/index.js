import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestion } from '../../selectors'

import Vector from '../Vector'
import Haystack from '../Haystack'

class Display extends Component {
  render() {
    return (
      <div className="col-12">
        <div /* Invisible div to see width of 100 chars */ className="dummy-sizing"></div>
        <div className="question part-1">{this.props.questionPart1}</div>
        <Vector />
        <div className="question part-2 mt-5">{this.props.questionPart2}</div>
        <Haystack />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { questionPart1, questionPart2 } = getQuestion(state)
  return { questionPart1, questionPart2 }

}

export default connect(mapStateToProps)(Display)