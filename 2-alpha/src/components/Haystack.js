import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothHaystackStrands, showCodons } from '../selectors'
import HelperPosition from './HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from './Codons'

class Haystack extends Component {
  render() {
    const { forward, reverse } = this.props
    return (
      <div className="haystack">
        <h4>Haystack</h4>
        <HelperPosition length={100} />
        <div className="forward">
          <div className="sequence">{forward}</div>
          <HaystackReverse />
        </div>
        <hr/>
        <div className="reverse">
          <HaystackForward />
          <div className="sequence">{reverse}</div>
          {showCodons ? <Codons seq={forward} /> : ''}
          {/* {showCodons ? <Codons seq={reverse} /> : ''} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...getBothHaystackStrands(state),
    showCodons: showCodons(state),
  }
}

export default connect(mapStateToProps)(Haystack)