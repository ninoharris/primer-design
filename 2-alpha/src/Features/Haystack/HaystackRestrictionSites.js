import React from 'react'
import _ from 'lodash'
import * as api from '../../api'

const HaystackRestrictionSites = ({ seq, restrictionSites }) => {
  const RESitesDOM = _.map(restrictionSites, (site) => {
    return (
      <div className="Restriction-Site-Container" key={site.pos}>
        <div>
          {_.pad('', site.pos)}
          <span className="Restriction-Site" style={{ backgroundColor: site.color, color: api.pickTextColor(site.color) }}>
            <span className="Name" style={{color: site.color}}>{site.name}</span>
            {site.seq}
          </span>
        </div>
      </div>
    )
  })
  return (
    <div className="Haystack-Restriction-Sites">
      {RESitesDOM}
    </div>
  )
}

export default HaystackRestrictionSites