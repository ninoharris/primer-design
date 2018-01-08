import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getUserVectorMatchesForward, getUserVectorMatchForwardAlignment, getUFG} from '../selectors'

// Goes like so: check if multiple matches exist or no matches at all, then show matches as warnings
// Otherwise, show alignment etc
class VectorForward extends Component {
  moreThanOneMatch() {
    const { matches } = this.props
    const matchesList = _.keys(matches)
    return (
      <div className="sequence multiple-matches">
        <ReactCSSTransitionGroup transitionName="matches" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {matchesList.map((matchPos,i) => {
            const match = matches[matchPos]
            return (
              <span className="multiple-match" key={i}>
                {_.pad('', match.pos)}
                <span key={matchPos} className="match">{match.seq}</span>
              </span>
            )
          })}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
  render() {
    if(this.props.matches) return this.moreThanOneMatch()
    const { result, FG } = this.props
    return (
      <ReactCSSTransitionGroup transitionName="matches" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="sequence FV" key='match'>
          {_.pad('',result.positionInVector)}
          <span className="leading">{result.leadingSeq}</span>
          <span className="restriction-site-match">{result.seq}</span>
          <span className="trailing">{result.trailingSeq}</span>
          <span className="FG unimportant">{FG}</span>
        </div>
      </ReactCSSTransitionGroup>
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