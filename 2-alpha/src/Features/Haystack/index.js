import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as api from '../../api'
import { getBothHaystackStrands, getUFG, getURG, getAllRestrictionSites } from '../../selectors'
import HelperPosition from '../../components/HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from '../../components/Codons'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'

class Haystack extends Component {
  getRestrictionSites = (seq) => {
    const RESites = api.getRestrictionSiteMatches(this.props.restrictionSites, seq)
    const RESitesDOM = _.map(RESites, (site) => {
      return (
      <span>
        {_.pad('', site.pos)}
        <span className="Restriction-Site">
          <span className="Name">{site.name}</span>
          {site.seq}
        </span>
      </span>
      )
    })
    return (
      <div className="Haystack-Restriction-Sites">
        {RESitesDOM}
      </div>
    )
  }
  render() {
    const { forward, reverse, FG, RG } = this.props
    const className = "haystack mt-3" + (FG.length > 3 ? ' haystack-with-UFG' : '') + (RG.length > 3 ? ' haystack-with-URG' : '')
    return (
      <div className={className}>
        <div style={{position: 'relative', top: '-1rem'}}>
          <div className="forward">        
            <div className="multiline">
              <div className="sequence">
                <HelperPosition length={forward.length} />
                {this.getRestrictionSites(forward)}
                <Left5 />{forward}<Right3 />
                <HaystackReverse />
              </div>
            </div>
          </div>
          <div className="reverse">
            <div className="multiline">
              <div className="sequence">
                <HaystackForward />
                <Left3 />{reverse}<Right5 />
              </div>
              <Codons seq={forward} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...getBothHaystackStrands(state),
    FG: getUFG(state),
    RG: getURG(state),
    restrictionSites: getAllRestrictionSites(state),
  }
}

export default connect(mapStateToProps)(Haystack)