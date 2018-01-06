import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackForwardMatches, getUFV } from '../selectors'

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
    const { pos, isExact, tooShort, FV } = this.props
    if(tooShort) return null
    return (
      <div className="sequence FG">
        <span className="offset-left unimportant FV">
          <span>{FV}</span>
        </span>
        {_.pad('', pos)}
        {isExact ? this.showExact() : this.showMismatches()}
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