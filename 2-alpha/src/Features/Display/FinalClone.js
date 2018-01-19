import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import HelperPosition from '../../components/HelperPosition'
import { getFinalClone } from '../../selectors/index';
import * as api from '../../api'

class FinalClone extends Component {
  getMarkers = (markers) => {
    let lastIndex = 0
    return markers.map(pos => {
      const marker = <span className="marker" key={pos}>{_.padStart('', pos - lastIndex, ' ')}</span>
      lastIndex = pos
      return marker
    })
  }
  getSequenceWithHover = (helpers, seqWithDetails, dir) => {
    let lastIndex = 0
    const sequenceOutput = _.map(seqWithDetails, ({ seq, text }) => {
      if(seq.length === 0) return
      let inside
      let helper = helpers.find(helper => helper.pos >= lastIndex && helper.pos < (seq.length + lastIndex))
      if(!helper) {
        inside = seq
      } else {
        const relativeHelperPos = helper.pos - lastIndex
        const { color } = helper
        const style = { color: api.pickTextColor(color), backgroundColor: color }
        inside = (
          <span>
            {seq.slice(0, relativeHelperPos)}
            <span className={`hl ${dir}-hl ${helper.name}`} style={style}>{seq.slice()}</span>
            {seq.slice(relativeHelperPos + helper.length)}
          </span>
        )
      }
      lastIndex += seq.length
      return (<span
        key={seq}
        className="Final-Clone-Seq-Chunk" 
        onMouseEnter={() => this.props.handleMouseEnter(text)}>{inside}</span>
      )
    })
    return sequenceOutput
  }
  render() {
    const { helpers, forward, markers } = this.props.finalClone
    const reverse = _.mapValues(forward, (o) => ({...o, seq: api.complementFromString(o.seq)}))
    return (
      <div className="Final-Clone">
        <HelperPosition length={151} />
        <div className="multiline">
          <div className="forward">
            <div className="sequence">
              <div className="markers sequence">{this.getMarkers(markers)}</div>
              {this.getSequenceWithHover(helpers, forward, 'forward')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  finalClone: getFinalClone(state)
})
export default connect(mapStateToProps)(FinalClone)