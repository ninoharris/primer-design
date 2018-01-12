import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothHaystackStrands, showCodons } from '../../selectors'
import HelperPosition from '../../components/HelperPosition'
import HaystackForward from './HaystackForward';
import HaystackReverse from './HaystackReverse'
import Codons from '../../components/Codons'
import { Left5, Left3, Right5, Right3 } from '../../components/HelperEnds'

class Haystack extends Component {
  render() {
    const { forward, reverse } = this.props
    return (
      <div className="haystack pt-3 pb-3 mt-3">
        <HelperPosition length={100} />
        <div className="forward">
          <div className="sequence">
            <Left5 />{forward}<Right3 />
          </div>
          <HaystackReverse />
        </div>
        <hr/>
        <div className="reverse">
          <HaystackForward />
          <div className="sequence">
            <Left3 />{reverse}<Right5 />
          </div>
          {showCodons ? <Codons seq={forward} /> : ''}
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