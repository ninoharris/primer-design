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
    <div className="vector admin-vector">
      <HelperPosition length={90} />
      <Markers markers={vectorMarkers} />
      <HelperMarkers helpers={vectorMarkers} />
      <div><HighlightedSequence helpers={helpers} sequence={forward} direction='forward' /></div>
      <div><HighlightedSequence helpers={helpers} sequence={reverse} direction='reverse' /></div>
    </div>
  )
}

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { vector = ' ', vectorStart = null, vectorEnd = null, helpers = [] } = selector(state,
    'vector', 'vectorStart', 'vectorEnd', 'helpers')
  
  const REHelpers = _.mapValues(
    api.getRestrictionSiteMatches(getAllRestrictionSites(state), vector), 
    ({ name, seq, pos, color = '#CCCCCC' }) => ({
      name, seq, pos, len: seq.length, color
    })
  )
  console.log(REHelpers)
  return {
    forward: vector,
    reverse: api.complementFromString(vector),
    vectorMarkers: [
      parseInt(vectorStart, 10),
      parseInt(vectorEnd, 10),
    ],
    helpers: [...helpers, ...REHelpers]
  }
}

export default connect(mapStateToProps)(VectorPreview)