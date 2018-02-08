import _ from 'lodash'
import React from 'react'
import * as api from '../api'

const RestrictionSitesPreview = () => {
  const RESitesList = api.RESites.map(RESite => (
    <div key={RESite.seq} className="RESites-list-item">
      <div className="name" style={{ backgroundColor: RESite.color, color: api.pickTextColor(RESite.color) }}>{RESite.name}:</div>
      <div className="preview">
        <div className="sequence"><span className="marker">{_.pad('', RESite.cutsForward, ' ')}</span>{RESite.seq}</div>
        <div className="sequence">
          <span className="marker">
            <span className="uncut">{_.pad('', RESite.cutsForward, ' ')}</span>
            <span className="cut-center">{_.pad('', RESite.cutsReverse - RESite.cutsForward, ' ')}</span></span>
          {api.complementFromString(RESite.seq)}
        </div >
      </div>
    </div>
  ))

  return (
    <div className="RESites-list">
      {RESitesList}
    </div>
  )
}

export default RestrictionSitesPreview