import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';

import { Left3, Left5, Right3, Right5 } from '../components/HelperEnds'
import Codons from '../components/Codons'
import HelperPosition from '../components/HelperPosition'
import Markers from '../components/Markers'
import * as api from '../api'

const HaystackPreview = ({ forward, reverse, haystackMarkers }) => (
  <div className="haystack Admin-Haystack">
    
    <div className="forward">
      <div className="multiline">
        <div className="sequence">
          <HelperPosition length={forward.length} interval={3} />
          <Markers className="Admin-Markers" markers={haystackMarkers} />
          <Left5 />{forward}<Right3 />
        </div>
      </div>
    </div>
    <div className="reverse">
      <div className="multiline">
        <div className="sequence">
          <Markers className="Admin-Markers" markers={haystackMarkers} />
          <Left3 />{reverse}<Right5 />
        </div>
        <Codons seq={forward} showCodons={true} />
      </div>
    </div>
  </div>
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