import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserVectorMatchesReverse, getUserVectorMatchReverseAlignment, getURGReverse } from '../selectors'

// Goes like so: check if multiple matches exist or no matches at all, then show matches as warnings
// Otherwise, show alignment etc
class VectorReverse extends Component {
  isNotOnlyOneMatch() {
    const { matches } = this.props
    const matchesList = _.keys(matches)
    return (
      <div className="sequence multiple-matches">
        {matchesList.map(matchPos => {
          const match = matches[matchPos]
          return (
            <span className="multiple-match">
              {_.pad('', match.pos)}
              <span key={matchPos} className="match">{match.seq}</span>
            </span>
          )
        })}
      </div>
    )
  }
  render() {
    if (this.props.matches) return this.isNotOnlyOneMatch()
    const { result, RG } = this.props
    return (
      <div className="sequence RV">
        {_.pad('', result.positionInVector - RG.length)}
        <span className="RG unimportant">{RG}</span>
        <span className="trailing">{result.trailingSeq}</span>
        <span className="restriction-site-match">{result.seq}</span>
        <span className="leading">{result.leadingSeq}</span>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const matches = getUserVectorMatchesReverse(state)
  if (Array.isArray(matches)) return { matches }
  const RG = getURGReverse(state)
  const result = getUserVectorMatchReverseAlignment(state)
  return { result, RG }
}

export default connect(mapStateToProps)(VectorReverse)