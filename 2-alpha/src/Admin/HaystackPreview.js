import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';
import styled from 'styled-components'

import { Left3, Left5, Right3, Right5 } from '../components/HelperEnds'
import Codons from '../components/Codons'
import HelperPosition from '../components/HelperPosition'
import Markers from '../components/Markers'
import HaystackRestrictionSites from '../Features/Haystack/HaystackRestrictionSites'
import * as api from '../api'

const HaystackContainer = styled.div`
  margin-top: -4rem;
`

const HaystackPreview = ({ forward, reverse, haystackMarkers, cursorPosition = null }) => (
  <HaystackContainer>
  <div className="haystack Admin-Haystack">
    <div className="forward multiline">
        <div className="sequence">
          <HelperPosition length={forward.length} interval={3} />
          <Markers className="Admin-Markers position-helper" markers={haystackMarkers} />
          {typeof cursorPosition === 'number' && cursorPosition < forward.length && cursorPosition !== 0 ?
            <Markers className="Admin-Markers Cursor-Position" markers={[cursorPosition]} /> : ''
          }
          <Left5 />
          <HaystackRestrictionSites 
            direction="forward" 
            restrictionSites={api.getRestrictionSiteMatches(forward)}
            alwaysShowName={true} 
            seq={forward} />
            {forward}
          <Right3 />
        </div>
    </div>
    <div className="reverse multiline">
      <div className="sequence">
        <Markers className="Admin-Markers position-helper" markers={haystackMarkers} />
        {typeof cursorPosition === 'number' && cursorPosition < forward.length && cursorPosition !== 0 ?
          <Markers className="Admin-Markers Cursor-Position" markers={[cursorPosition]} /> : ''
        }
        <Left3 />
        <HaystackRestrictionSites 
          direction="reverse" 
          restrictionSites={api.getRestrictionSiteMatches(reverse)} 
          alwaysShowName={true} 
          seq={reverse} />
          {reverse}
        <Right5 />
      </div>
      <Codons seq={forward} showCodons={true} />
    </div>
  </div>
  </HaystackContainer>
)

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { haystack = ' ', constructStart = null, constructEnd = null } = selector(state, 'haystack', 'constructStart', 'constructEnd')
  return {
    forward: haystack,
    reverse: api.complementFromString(haystack),
    haystackMarkers: [
      parseInt(constructStart, 10),
      parseInt(constructEnd, 10),
    ],
  }
}

export default connect(mapStateToProps)(HaystackPreview)