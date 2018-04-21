import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUFV } from '../../selectors'
import { getHaystackForwardMatches } from '../../selectors/evaluations'
import { Left5, Right3 } from '../../components/HelperEnds'

class HaystackForward extends Component {
  showExact = () => {
    return this.props.input
  }

  showMismatches = () => {
    const { correctChars, input } = this.props
    return input.split('').map((char, i) => {
      if (char === correctChars[i]) {
        return <span key={i} style={{ }}>{char}</span>
      } else {
        return <span key={i} style={{ color: 'red', fontWeight: 'bold', top: '-2px' }}>{char}</span>
      }
    })
  }
  render() {
    const { pos, isExact, normalMatch, FV, input } = this.props
    if(!input) return null
    return (
      <div className="sequence FG user-sequence">
        {_.pad('', pos)}<span className="offset-left unimportant FV" >
          <span style={{ 'transformOrigin': 'center right', 'transform': 'rotate(20deg)' }}><Left5 />{FV}</span>
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