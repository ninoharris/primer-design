import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothHaystackStrands, showCodons, getUFG, getURG } from '../../selectors'
import HelperPosition from '../../components/HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from '../../components/Codons'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'

class Haystack extends Component {
  render() {
    const { forward, reverse, FG, RG } = this.props
    const className = "haystack mt-3" + (FG.length > 3 ? ' haystack-with-UFG' : '') + (RG.length > 3 ? ' haystack-with-URG' : '')
    return (
      <div className={className}>
        <HelperPosition length={100} />
        <div className="forward">        
          <div className="multiline">
            <div className="sequence">
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...getBothHaystackStrands(state),
    FG: getUFG(state),
    RG: getURG(state),
  }
}

export default connect(mapStateToProps)(Haystack)