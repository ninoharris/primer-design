import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getUserVectorMatchReverse, getURGReverse } from '../../selectors'
import { Left3, Right5 } from '../../components/HelperEnds'

// Goes like so: check if multiple matches exist or no matches at all, then show matches as warnings
// Otherwise, show alignment etc
class VectorReverse extends Component {
  moreThanOneMatch() {
    const { matches } = this.props
    return (
      <div className="sequence multiple-matches">
        <ReactCSSTransitionGroup transitionName="matches" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {_.map(matches, (match, matchPos) => (
            <span className="multiple-match" key={matchPos}>
              {_.pad('', match.pos)}
              <span key={matchPos} className="match">{match.seq}</span>
            </span>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
  singleMatch() {
    const { singleMatch, RG } = this.props
    return (
      <ReactCSSTransitionGroup transitionName="matches" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="sequence RV" key='match'>
          {_.pad('', singleMatch.positionInVector - RG.length)}
          
          <span className="RG unimportant"><Left3 />{RG}</span>
          <span className="trailing">{singleMatch.trailingSeq}</span>
          <span className="restriction-site-match">{singleMatch.seq}</span>
          <span className="leading">{singleMatch.leadingSeq}</span>
          <Right5 />
        </div>
      </ReactCSSTransitionGroup>
    )
  }
  render() {
    const { multipleMatches, matches = [] } = this.props
    if (multipleMatches) {
      if (matches.length === 0) return null
      return this.moreThanOneMatch()
    }
    return this.singleMatch()
  }
}
VectorReverse.propTypes = {
  multipleMatches: PropTypes.bool,
  singleMatch: PropTypes.object,
  matches: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
  return { ...getUserVectorMatchReverse(state), RG: getURGReverse(state) }
}

export default connect(mapStateToProps)(VectorReverse)