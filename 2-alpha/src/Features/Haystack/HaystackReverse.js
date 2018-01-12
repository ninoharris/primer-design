import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHaystackReverseMatches, getURVReverse } from '../../selectors'
import { Right5, Left3 } from '../../components/HelperEnds'

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
          <Left3 />
        </span>
        <span className="reverse-arrow">{isExact && normalMatch && frame === 0 ? this.showExact() : this.showMismatches()}</span>
        <span className="offset-right unimportant">
          <span>{RV}<Right5 /></span>
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