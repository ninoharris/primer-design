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
    const { pos, isExact, normalMatch, tooShort, RV, input } = this.props
    if (!input) return null
    return (
      <div className="sequence RG">
        {_.pad('', pos)}<span className="offset-left unimportant RV">
          <span>{RV}</span>
        </span>
        {isExact && normalMatch ? this.showExact() : this.showMismatches()}
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