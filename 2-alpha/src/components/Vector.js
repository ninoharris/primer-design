// THIS FILE MUST NOT CONTAIN ANYTHING RELATED TO THE USER'S INPUT.
import * as api from '../api' 
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothVectorStrands, getVectorHelpers } from '../selectors'

import VectorForward from './VectorForward'
import HelperPosition from './HelperPosition'
import VectorReverse from './VectorReverse';


class Vector extends Component {
  getHelpers = () => {
    return _.map(this.props.helpers, (helper => {
      const pad = _.pad('',helper.pos)
      const style = {
        color: helper.color || '#666666'
      }
      const text = _.padEnd(helper.name, helper.len)
      return(
        <div key={helper.pos} className="helper">
          <span className="pad">{pad}</span>
          <span style={style}>{text}</span>
        </div>
      )
    }))
  }
  getHighlights = (helpers, sequence, dir) => {
    let lastIndex = 0, output = []
    _.map(helpers, ({pos, name, len, color}) => {
      if(pos > lastIndex) {
        output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex, pos)}</span>)
      }
      const text = sequence.substr(pos, len)
      const style = { color: api.pickTextColor(color), backgroundColor: color }
      output.push(<span key={pos} className={`hl ${dir}-hl ${name}`} style={style}>{text}</span>)
      lastIndex = len + pos
    })
    if(lastIndex < sequence.length) { // we're not done yet...
      output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex)}</span>)
    }
    return output
  }
  getUserInputAligned = () => {

  }
  render() {
    const { forward, reverse, helpers, showCodons } = this.props
    console.log('reverse:', reverse)
    return (
      <div className="vector pt-3 pb-3 mt-3">
        <HelperPosition length={100} />
        <div className="forward">
          <div className="helpers sequence">
            {this.getHelpers()}
          </div>
          <div className="sequence">
            <span className="offset-left"><span>5'-</span></span>
            {this.getHighlights(helpers, forward, 'forward')}
            <span className="offset-right"><span>-3'</span></span>
          </div>
          <VectorReverse />

        </div>
        <div className="reverse">
          <VectorForward />
          <div className="sequence">
            <span className="offset-left"><span>3'-</span></span>
            {this.getHighlights(helpers, reverse, 'reverse')}
            <span className="offset-right"><span>-5'</span></span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { forward, reverse } = getBothVectorStrands(state)
  
  return {
    forward,
    reverse,
    helpers: getVectorHelpers(state)
  }
}

export default connect(mapStateToProps)(Vector)