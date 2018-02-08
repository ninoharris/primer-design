import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import * as api from '../api'

import HelperPosition from '../components/HelperPosition'
import HelperMarkers from '../components/HelperMarkers'
import HighlightedSequence from '../components/HighlightedSequence'
import Markers from '../components/Markers';

export const VectorPreview = ({ forward, reverse, helpers, vectorMarkers, cursorPosition = null }) => {
  return (
    <div className="vector Admin-Vector pt-3 pb-3">
      <div className="forward">
        <div className="sequence">
          <HelperPosition length={forward.length} className="fullheight" />
          <Markers markers={vectorMarkers} className="Admin-Markers Admin-Vector-Markers" />
          {isNaN(cursorPosition) ? '' : <Markers className="Admin-Markers Cursor-Position" markers={[cursorPosition]} />}
          <HelperMarkers helpers={helpers} />
          <HighlightedSequence helpers={helpers} sequence={forward} direction='forward' />
        </div>
      </div>
      <div className="reverse sequence">
        <div className="sequence">
          <Markers markers={vectorMarkers} className="Admin-Markers Admin-Vector-Markers" />
          {isNaN(cursorPosition) ? '' : <Markers className="Admin-Markers Cursor-Position" markers={[cursorPosition]} />}
          <HighlightedSequence helpers={helpers} sequence={reverse} direction='reverse' />
        </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { vector = ' ', vectorStart = null, vectorEnd = null, fusionStart = false, fusionEnd = false, helpers = [] } = selector(state,
    'vector', 'vectorStart', 'vectorEnd', 'fusionStart', 'fusionEnd', 'helpers')

  const userMadeHelpers = helpers.map(helper => ({
      ...helper,
      pos: Number(helper.pos),
      len: Number(helper.len),
  })).filter(helper => helper.pos && helper.len && helper.name && helper.color)
  
  const REHelpers = api.getRestrictionSiteMatches(vector)
  const vectorMarkers = []
  if (fusionStart) { vectorMarkers.push(parseInt(vectorStart, 10))}
  if (fusionEnd) { vectorMarkers.push(parseInt(vectorEnd, 10)) }

  return {
    forward: vector,
    reverse: api.complementFromString(vector),
    vectorMarkers,
    helpers: [...userMadeHelpers, ...REHelpers].sort((a,b) => a.pos - b.pos)
  }
}

export default connect(mapStateToProps)(VectorPreview)