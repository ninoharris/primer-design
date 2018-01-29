import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { getAllRestrictionSites } from '../selectors'

const RestrictionSitesPreview = ({ restrictionSites }) => {
  console.log(restrictionSites)
  const RESitesList = _.keys(restrictionSites).map(seq => {
    const RESite = restrictionSites[seq]
    return (
      <li style={{ backgroundColor: RESite.color}}>
        <strong>{RESite.name}:</strong> {RESite.seq}
      </li>
    )
  })

  return (
    <ul className="RESites-list">
      {RESitesList}
    </ul>
  )
}

const mapStateToProps = (state) => ({ restrictionSites: getAllRestrictionSites(state) })

export default connect(mapStateToProps)(RestrictionSitesPreview)