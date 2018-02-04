import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getURVReverse } from '../../selectors'
import { getHaystackReverseMatches } from '../../selectors/evaluations'
import { Right5, Left3 } from '../../components/HelperEnds'

class HaystackForward extends Component {
  showExact = () => {
    return this.props.input
  }
  showMismatches = () => {
    const { correctChars, input} = this.props
    return input.split('').map((char, i) => {
      if(char === correctChars[i]) {
        return <span key={i} style={{fontWeight: 'bold'}}>{char}</span>
      } else {
        return <span key={i} style={{ color: 'red' }}>{char}</span>
      }
    })
  }
  render() {
    const { pos, isExact, normalMatch, RV, input, frame } = this.props
    if (!input) return null
    return (
      <div className="sequence RG user-sequence">
        {_.pad('', pos)}<Left3 />
        <span className="reverse-arrow">{isExact && normalMatch && frame === 0 ? this.showExact() : this.showMismatches()}</span>
        <span className="offset-right unimportant">
          <span className="RV">{RV}<Right5 /></span>
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