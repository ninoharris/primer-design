import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackReverseMatches, getURVReverse } from '../selectors'

class HaystackForward extends Component {
  showExact = () => {
    return this.props.input
  }
  showMismatches = () => {
    const { correctChars, wrongSeqQuery } = this.props
    return (
      <span className="multiple-matches">
        <span className="multiple-match mismatch">{wrongSeqQuery}</span>
        <span className="multiple-match match">{correctChars}</span>
      </span>
    )
  }
  render() {
    const { pos, isExact, normalMatch, tooShort, RV, input, frame } = this.props
    if (!input) return null
    return (
      <div className="sequence RG">
        {_.pad('', pos)}<span className="offset-left unimportant RV">
          <span><span className="end">3'-</span></span>
        </span>
        <span className="reverse-arrow">{isExact && normalMatch && frame === 0 ? this.showExact() : this.showMismatches()}</span>
        <span className="offset-right unimportant">
          <span>{RV}<span className="end">-5'</span></span>
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...getHaystackReverseMatches(state),
    RV: getURVReverse(state)
  }
}

export default connect(mapStateToProps)(HaystackForward)