import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';

import { Left3, Left5, Right3, Right5 } from '../components/HelperEnds'
import Codons from '../components/Codons'
import HelperPosition from '../components/HelperPosition'
import * as api from '../api'

class HaystackPreview extends Component {
  getMarkers = (markers = []) => {
    return (
      <div className="Admin-Markers sequence">
        {markers.map(marker => {
          if (isNaN(marker)) return null
          return <span className="admin-marker" key={marker}>{_.padStart('', marker, ' ')}</span>
        })}
      </div>
    )
  }
  render() {
    const { haystack } = this.props
    return (
      <div className="haystack admin-haystack">
        <HelperPosition length={90} interval={3} />
        <div className="forward">
          <div className="multiline">
            <div className="sequence">
              {this.getMarkers(this.props.haystackMarkers)}
              <Left5 />{haystack.forward}<Right3 />
            </div>
          </div>
        </div>
        <div className="reverse">
          <div className="multiline">
            <div className="sequence">
              <Left3 />{haystack.reverse}<Right5 />
            </div>
            <Codons seq={haystack.forward} showCodons={true} />
          </div>
        </div>
      </div>
    )
  }
}

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { haystack = ' ', vector = ' ', vectorStart = null, vectorEnd = null, constructStart = null, constructEnd = null, helpers = [] } = selector(state,
    'haystack', 'vector', 'vectorStart', 'vectorEnd', 'constructStart', 'constructEnd', 'helpers')
  const previews = {
    haystack: {
      forward: haystack,
      reverse: api.complementFromString(haystack),
    },
    vector: {
      forward: vector,
      reverse: api.complementFromString(vector)
    },
    haystackMarkers: [
      parseInt(constructStart, 10),
      parseInt(constructEnd, 10),
    ],
    vectorMarkers: [
      parseInt(vectorStart, 10),
      parseInt(vectorEnd, 10),
    ],
    helpers
  }
  return previews
}

export default connect(mapStateToProps)(HaystackPreview)