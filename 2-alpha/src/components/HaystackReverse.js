import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackReverseMatches, getURV, getURVReverse } from '../selectors'

class HaystackForward extends Component {
  showExact = () => {
    return this.props.rightSeq
  }
  showMismatches = () => {
    console.log('showing mismatches')
    const { rightSeq, wrongSeqQuery } = this.props
    return (
      <span className="multiple-matches">
        <span className="multiple-match mismatch">{wrongSeqQuery}</span>
        <span className="multiple-match match">{rightSeq}</span>
      </span>
    )
  }
  render() {
    const { pos, isExact, tooShort, RV } = this.props
    if (tooShort) return null
    return (
      <div className="sequence RG">
        {_.pad('', pos)}
        {isExact ? this.showExact() : this.showMismatches()}
        <span className="offset-right unimportant RV">
          <span>{RV}</span>
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