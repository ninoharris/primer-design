import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserVectorMatchesForward, getUserVectorMatchForwardAlignment, getUFG} from '../selectors'

// Goes like so: check if multiple matches exist or no matches at all, then show matches as warnings
// Otherwise, show alignment etc
class VectorForward extends Component {
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
    if(this.props.matches) return this.isNotOnlyOneMatch()
    const { result, FG } = this.props
    return (
      <div className="sequence FV">
        {_.pad('',result.positionInVector)}
        <span className="leading">{result.leadingSeq}</span>
        <span className="restriction-site-match">{result.seq}</span>
        <span className="trailing">{result.trailingSeq}</span>
        <span className="FG unimportant">{FG}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const matches = getUserVectorMatchesForward(state)
  if(Array.isArray(matches)) return { matches }
  const FG = getUFG(state)
  const result = getUserVectorMatchForwardAlignment(state)
  return { result, FG }
}

export default connect(mapStateToProps)(VectorForward)