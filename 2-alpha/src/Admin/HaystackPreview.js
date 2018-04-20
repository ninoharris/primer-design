import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';
import styled from 'styled-components'

import theme from '../styles/theme'

import { Left3, Left5, Right3, Right5 } from '../components/HelperEnds'
import Codons from '../components/Codons'
import HelperPosition from '../components/HelperPosition'
import Marker from '../components/Marker'
import HaystackRestrictionSites from '../Features/Haystack/HaystackRestrictionSites'
import * as api from '../api'

const HaystackContainer = styled.div`
  margin-top: -4rem;
`

const HaystackPreview = ({ forward, reverse, sequenceStartMarker, sequenceEndMarker, cursorPosition = null, restrictionSites }) => (
  <HaystackContainer>
  <div className="haystack Admin-Haystack">
    <div className="forward multiline">
        <div className="sequence">
          <HelperPosition length={forward.length} interval={3} />
          <Marker className="" {...sequenceStartMarker} height="80px" top="60px" />
          <Marker className="" {...sequenceEndMarker} height="80px" top="60px" />
          {typeof cursorPosition === 'number' && cursorPosition <= forward.length && cursorPosition !== 0 ?
            <Marker className="" position={cursorPosition} text='Cursor' color={theme.black} height="80px" top="60px" /> : ''
          }
          <Left5 />
          <HaystackRestrictionSites 
            sequenceDirection="forward" 
            restrictionSites={restrictionSites}
            alwaysShowName={true} 
            seq={forward} />
            {forward}
          <Right3 />
        </div>
    </div>
    <div className="reverse multiline">
      <div className="sequence">
        <Left3 />
        <HaystackRestrictionSites 
          sequenceDirection="reverse" 
          restrictionSites={restrictionSites}
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
  const forward = haystack
  const reverse = api.complementFromString(haystack)
  return {
    forward,
    reverse,
    restrictionSites: [ ...api.getRestrictionSiteMatches(forward), ...api.getRestrictionSiteMatches(reverse).map(site => ({...site, direction: 'reverse'}))],
    sequenceStartMarker: { position: parseInt(constructStart, 10), color: theme.RV, text: 'Start of GOI/SOI' },
    sequenceEndMarker: { position: parseInt(constructEnd, 10), color: theme.RG, text: 'End of GOI/SOI' },
  }
}

export default connect(mapStateToProps)(HaystackPreview)