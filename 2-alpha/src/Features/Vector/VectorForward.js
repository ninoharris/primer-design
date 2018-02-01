import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getUserVectorMatchForward, getUFG} from '../../selectors'
import { Left5, Right3 } from '../../components/HelperEnds'

// Goes like so: check if multiple matches exist or no matches at all, then show matches as warnings
// Otherwise, show alignment etc
class VectorForward extends Component {
  moreThanOneMatch() {
    const { matches } = this.props
    console.log('More than one match', matches)
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
    const { singleMatch, FG } = this.props
    return (
      <ReactCSSTransitionGroup transitionName="matches" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="sequence FV" key='match'>
          {_.pad('', singleMatch.positionInVector)}
          <Left5 />
          <span className="leading">{singleMatch.leadingSeq}</span>
          <span className="restriction-site-match">{singleMatch.seq}</span>
          <span className="trailing">{singleMatch.trailingSeq}</span>
          <span className="FG unimportant">{FG}<Right3 /></span>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
  render() {
    const { multipleMatches, matches = []} = this.props
    if(multipleMatches) {
      if(matches.length === 0) return null
      return this.moreThanOneMatch()
    }
    return this.singleMatch()
  }
}
VectorForward.propTypes = {
  multipleMatches: PropTypes.bool,
  singleMatch: PropTypes.object,
  matches: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
  return { ...getUserVectorMatchForward(state), FG: getUFG(state) }
}

export default connect(mapStateToProps)(VectorForward)