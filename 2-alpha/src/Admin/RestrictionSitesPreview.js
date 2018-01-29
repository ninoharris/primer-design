import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { getAllRestrictionSites } from '../selectors'
import * as api from '../api'

const RestrictionSitesPreview = ({ restrictionSites }) => {
  console.log(restrictionSites)
  const RESitesList = _.keys(restrictionSites).map(seq => {
    const RESite = restrictionSites[seq]
    return (
      <div className="RESites-list-item">
        <div className="name" style={{ backgroundColor: RESite.color, color: api.pickTextColor(RESite.color) }}>{RESite.name}:</div> 
        <div className="preview">
          <div className="sequence"><span className="marker">{_.pad('', RESite.cutsForward, ' ')}</span>{RESite.seq}</div>
          <div className="sequence">
            <span className="marker">
              <span className="uncut">{_.pad('', RESite.cutsForward, ' ')}</span>
              <span className="cut-center">{_.pad('', RESite.cutsReverse - RESite.cutsForward, ' ')}</span></span>
            { api.complementFromString(RESite.seq) }
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

const mapStateToProps = (state) => ({ restrictionSites: getAllRestrictionSites(state) })

export default connect(mapStateToProps)(RestrictionSitesPreview)