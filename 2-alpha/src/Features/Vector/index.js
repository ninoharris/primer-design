// THIS FILE MUST NOT CONTAIN ANYTHING RELATED TO THE USER'S INPUT.
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getBothVectorStrands, getVectorHelpers } from '../../selectors'

import VectorForward from './VectorForward'
import VectorReverse from './VectorReverse'
import HelperPosition from '../../components/HelperPosition';
import HelperMarkers from '../../components/HelperMarkers'
import HighlightedSequence from '../../components/HighlightedSequence'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'


const Vector = ({ forward = '', reverse = '', helpers = []}) => (
  <div className="vector pt-3 pb-3 mt-3">
    <HelperPosition length={90} className="fullheight" />
    <div className="forward mb-3">
      <HelperMarkers helpers={helpers} />
      <div className="sequence">
        <Left5 />
        <HighlightedSequence helpers={helpers} sequence={forward} direction='forward' />
        <Right3 />
      </div>
      <VectorReverse />
    </div>
    <div className="reverse">
      <VectorForward />
      <div className="sequence">
        <Left3 />
        <HighlightedSequence helpers={helpers} sequence={reverse} direction='reverse' />
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
    helpers: getVectorHelpers(state),
  }
}

export default connect(mapStateToProps)(Vector)