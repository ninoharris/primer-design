import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackForwardMatches, getUFV } from '../../selectors'
import { Left5, Right3 } from '../../components/HelperEnds'

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
      <div className="sequence FG user-sequence">
        {_.pad('', pos)}<span className="offset-left unimportant FV">
          <span><Left5 />{FV}</span>
        </span>
        <span className="forward-arrow">
          {isExact && normalMatch ? this.showExact() : this.showMismatches()}<Right3 />
        </span>
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