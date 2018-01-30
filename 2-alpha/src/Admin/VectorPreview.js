import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import * as api from '../api'

const VectorPreview = ({ }) => {
  return (
    <div className="vector admin-vector">

    </div>
  )
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

export default connect(mapStateToProps)(VectorPreview)