import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import * as api from '../api'

import HelperPosition from '../components/HelperPosition'
import HelperMarkers from '../components/HelperMarkers'
import HighlightedSequence from '../components/HighlightedSequence'
import Markers from '../components/Markers';
import { getAllRestrictionSites } from '../selectors/index';

const VectorPreview = ({ forward, reverse, helpers, vectorMarkers }) => {
  console.log('I swear', helpers, vectorMarkers)
  return (
    <div className="vector Admin-Vector pt-3 pb-3">
      <HelperPosition length={90} />
      <HelperMarkers helpers={vectorMarkers} />
      <div className="forward">
        <div className="sequence">
          <Markers markers={vectorMarkers} className="Admin-Markers Admin-Vector-Markers" />
          <HighlightedSequence helpers={helpers} sequence={forward} direction='forward' />
        </div>
      </div>
      <div className="reverse sequence">
        <div className="sequence">
          <Markers markers={vectorMarkers} className="Admin-Markers Admin-Vector-Markers" />
          <HighlightedSequence helpers={helpers} sequence={reverse} direction='reverse' />
        </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { vector = ' ', vectorStart = null, vectorEnd = null, helpers = [] } = selector(state,
    'vector', 'vectorStart', 'vectorEnd', 'helpers')
  
  const REHelpersObj = api.getRestrictionSiteMatches(getAllRestrictionSites(state), vector)
  const REHelpers = _.flatMap(
    REHelpersObj, 
    ({ name, seq, pos, color = '#CCCCCC' }) => ({
      name, seq, pos: Number(pos), len: seq.length, color
    })
  )
  return {
    forward: vector,
    reverse: api.complementFromString(vector),
    vectorMarkers: [
      parseInt(vectorStart, 10),
      parseInt(vectorEnd, 10),
    ],
    helpers: [...helpers, ...REHelpers].sort((a,b) => a.pos - b.pos)
  }
}

export default connect(mapStateToProps)(VectorPreview)