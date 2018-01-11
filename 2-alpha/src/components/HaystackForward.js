import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackForwardMatches, getUFV } from '../selectors'

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
    const { pos, isExact, normalMatch, tooShort, FV, input } = this.props
    if(!input) return null
    return (
      <div className="sequence FG">
        {_.pad('', pos)}<span className="offset-left unimportant FV">
          <span><span className="end">5'-</span>{FV}</span>
        </span>
        <span className="forward-arrow">{isExact && normalMatch ? this.showExact() : this.showMismatches()}<span className="end">-3'</span></span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    ...getHaystackForwardMatches(state),
    FV: getUFV(state)
  }
}

export default connect(mapStateToProps)(HaystackForward)