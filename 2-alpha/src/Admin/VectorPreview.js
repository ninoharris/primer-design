import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import * as api from '../api'
import styled from 'styled-components'

import theme from '../styles/theme'

import HelperPosition from '../components/HelperPosition'
import Marker from '../components/Marker'
import HelperMarkers from '../components/HelperMarkers'
import SequenceWithRESites from '../components/SequenceWithRESites'
// import Markers from '../components/Markers';

const Container = styled.div`
  margin-bottom: 2rem;
`

export const VectorPreview = ({ 
  forward, 
  reverse, 
  NPosMarker,
  CPosMarker,
  REHelpers, 
  contextualHelpers, 
  cursorPosition = null 
}) => {
  console.log('REHelpers:', REHelpers)
  return (
    <Container className="vector Admin-Vector pt-3 mb-3 pb-3">
      <div className="forward">
        <div className="sequence">
          <HelperPosition length={forward.length} className="fullheight" />
          <Marker className="" {...NPosMarker} height="30px" top="0px" />
          <Marker className="" {...CPosMarker} height="30px" top="0px" />
          {typeof cursorPosition === 'number' && cursorPosition <= forward.length && cursorPosition !== 0 ?
            <Marker className="" position={cursorPosition} text='Cursor' color={theme.black} /> : ''
          }
          <SequenceWithRESites RESites={REHelpers} sequence={forward} sequenceDirection='forward' />
        </div>
      </div>
      <div className="reverse sequence">
        <div className="sequence">
          <SequenceWithRESites RESites={REHelpers} sequence={reverse} sequenceDirection='reverse' />
        </div>
      </div>
    </Container>
  )
}

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {

  const { vector = ' ', vectorStart = null, vectorEnd = null, fusionStart = false, fusionEnd = false, helpers = [] } = selector(
    state, 'vector', 'vectorStart', 'vectorEnd', 'fusionStart', 'fusionEnd', 'helpers'
  )

  const contextualHelpers = helpers.map(helper => ({
      ...helper,
      pos: Number(helper.pos),
      len: Number(helper.len),
  })).filter(helper => helper.pos && helper.len && helper.name && helper.color)
  
  const REHelpers = api.getRestrictionSiteMatches(vector)
  let NPosMarker = {}, CPosMarker = {}
  if (fusionStart) { 
    NPosMarker = { position: parseInt(vectorStart, 10), color: theme.RV, text: 'N‑terminal position' }
  }
  if (fusionEnd) { 
    CPosMarker = { position: parseInt(vectorEnd, 10), color: theme.RG, text: 'C‑terminal position' }
  }
  return {
    forward: vector,
    reverse: api.complementFromString(vector),
    REHelpers,
    contextualHelpers,
    NPosMarker,
    CPosMarker,
  }
}

export default connect(mapStateToProps)(VectorPreview)