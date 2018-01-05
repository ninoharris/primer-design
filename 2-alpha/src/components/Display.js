import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothVectorStrands, getBothHaystackStrands, getQuestion} from '../selectors'

class Display extends Component {
  render() {
    if(!this.props.exercise) {
      return <div>Loading...</div>
    }
    const { question, forward, reverse } = this.props.exercise
    return (
      <div>
        <strong>{question}</strong>
        <div className="vector">
          <div className="sequence">
            {forward}
          </div>
          <div className="sequence">
            {reverse}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { forward, reverse } = getBothHaystackStrands(state)
  const question = getQuestion(state)
  return { forward, reverse, question }
}

export default connect(mapStateToProps)(Display)