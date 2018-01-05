// THIS FILE MUST NOT CONTAIN ANYTHING RELATED TO THE USER'S INPUT.

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothVectorStrands, getVectorHelpers } from '../selectors'
import * as api from '../api'

import VectorForward from './VectorForward'

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
    console.log('get highelights called')
    let lastIndex = 0, output = []
    _.map(helpers, ({pos, name, len}) => {
      if(pos > lastIndex) {
        output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex, pos)}</span>)
      }
      const text = sequence.substr(pos, len)
      output.push(<span key={pos} className={`hl ${dir}-hl ${name}`}>{text}</span>)
      lastIndex = len + pos
    })
    return output
  }
  getUserInputAligned = () => {

  }
  render() {
    const { forward, reverse, helpers } = this.props
    return (
      <div className="vector">
        <div className="col-12 forward">
          <div className="helpers sequence">
            {this.getHelpers()}
          </div>
          <div className="sequence">
            {this.getHighlights(helpers, forward, 'forward')}
          </div>
          <div className="sequence">
            {api.generateHelper(100)}
          </div>

        </div>
        <div className="col-12 reverse">
          <VectorForward />
          <div className="sequence">
            {this.getHighlights(helpers, reverse, 'reverse')}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { forward, reverse } = getBothVectorStrands(state)
  const helpers = getVectorHelpers(state)
// SO CONFUSING.
  
  return {
    forward,
    reverse,
  }
}

export default connect(mapStateToProps)(Vector)