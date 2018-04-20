// THIS FILE MUST NOT CONTAIN ANYTHING RELATED TO THE USER'S INPUT.
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getBothVectorStrands, getVectorRestrictionSites, getVectorContextualHelpers } from '../../selectors'

import VectorForward from './VectorForward'
import VectorReverse from './VectorReverse'
import HelperPosition from '../../components/HelperPosition'
import HelperMarkers from '../../components/HelperMarkers'
import SequenceWithRESites from '../../components/SequenceWithRESites'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'
import ContextualHelpers from '../../components/ContextualHelpers'

const Vector = ({ forward = '', reverse = '', RESites = []}) => (
  <div className="vector pt-3 pb-3 mt-3">
    <HelperPosition length={90} className="fullheight" />
    <div className="forward mb-3">
      <HelperMarkers helpers={RESites} />
      <div className="sequence">
        <Left5 />
        <ContextualHelpers />
        <SequenceWithRESites RESites={RESites} sequence={forward} sequenceDirection='forward' />
        <Right3 />
      </div>
      <VectorReverse />
    </div>
    <div className="reverse">
      <VectorForward />
      <div className="sequence">
        <Left3 />
        <ContextualHelpers />
        <SequenceWithRESites RESites={RESites} sequence={reverse} sequenceDirection='reverse' />
        <Right5 />
      </div>
    </div>
  </div>
)
Vector.propTypes = {
  forward: PropTypes.string.isRequired,
  reverse: PropTypes.string.isRequired,
  helpers: PropTypes.arrayOf(
    PropTypes.shape({
      pos: PropTypes.number.isRequired,
      len: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired
}

const mapStateToProps = (state) => {
  const { forward, reverse } = getBothVectorStrands(state)
  return {
    forward,
    reverse,
    RESites: getVectorRestrictionSites(state),
    contextualHelpers: getVectorContextualHelpers(state)
  }
}

export default connect(mapStateToProps)(Vector)