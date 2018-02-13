import _ from 'lodash'
import React from 'react'
import * as api from '../api'

const RestrictionSitesPreview = () => {
  const RESitesList = api.RESites.map((RESite) => {
    const isForwardCutAfterReverseCut = (RESite.cutsForward - RESite.cutsReverse) >= 0
    const reverseMarker = isForwardCutAfterReverseCut ? (
      <span className="marker">
        <span className="cut-right">{_.pad('', RESite.cutsReverse, ' ')}</span>
        <span className="cut-center">{_.pad('', Math.abs(RESite.cutsReverse - RESite.cutsForward), ' ')}</span>
      </span>
    ) : (
      <span className="marker">
        <span className="uncut">{_.pad('', RESite.cutsForward, ' ')}</span>
        <span className="cut-center">{_.pad('', Math.abs(RESite.cutsReverse - RESite.cutsForward), ' ')}</span>
        <span className="cut-right"></span>
      </span>
    )
    return (
    <div key={RESite.seq} className="RESites-list-item">
      <div className="name" style={{ backgroundColor: RESite.color, color: api.pickTextColor(RESite.color) }}>{RESite.name}:</div>
      <div className="preview">
        <div className="sequence">
          <span className="marker"><span className="cut-right">{_.pad('', RESite.cutsForward, ' ')}</span></span>
          {RESite.seq}
        </div>
        <div className="sequence">
          {reverseMarker}
          {api.complementFromString(RESite.seq)}
        </div >
      </div>
    </div>
    )
  })

  return (
    <div className="RESites-list">
      {RESitesList}
    </div>
  )
}

export default RestrictionSitesPreview