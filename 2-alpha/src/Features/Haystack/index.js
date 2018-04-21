import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothHaystackStrands, getUFG, getURG, getHaystackRestrictionSites } from '../../selectors'

import HelperPosition from '../../components/HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from '../../components/Codons'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'
import HaystackRestrictionSites from './HaystackRestrictionSites';

export class Haystack extends Component {
  state = {
    hoveredItem: null
  }
  handleHover = (index) => {
    this.setState({ hoveredItem: isNaN(index) ? null : index })
  }
  render() {
    const { forward, reverse, FG, RG, restrictionSites } = this.props
    const className = "haystack mt-3" + (FG.length >= 1 ? ' haystack-with-UFG' : '') + (RG.length >= 1 ? ' haystack-with-URG' : '')
    return (
      <div className={className}>
        <div style={{ position: 'relative', top: '-1rem' }}>
          <div className="forward">
            <div className="multiline">
              <div className="sequence">
                <HelperPosition length={forward.length} />
                <HaystackRestrictionSites 
                  seq={forward} 
                  restrictionSites={restrictionSites} 
                  onHover={this.handleHover} hoveredItem={this.state.hoveredItem}
                  sequenceDirection='forward'
                />
                <Left5 />
                {forward}
                <Right3 />
                <HaystackReverse />
              </div>
            </div>
          </div>
          <div className="reverse">
            <div className="multiline">
              <div className="sequence">
                <HaystackForward />
                <HaystackRestrictionSites 
                  seq={reverse} 
                  restrictionSites={restrictionSites} 
                  onHover={this.handleHover} hoveredItem={this.state.hoveredItem} 
                  sequenceDirection='reverse'
                />
                <Left3 />
                {reverse}
                <Right5 />
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
  const props = {
    ...getBothHaystackStrands(state),
    FG: getUFG(state),
    RG: getURG(state),
    restrictionSites: getHaystackRestrictionSites(state)
  }
  return props
}



export default connect(mapStateToProps)(Haystack)