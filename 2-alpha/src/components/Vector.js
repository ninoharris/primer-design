import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBothVectorStrands, getVectorRestrictionSites } from '../selectors'

class Vector extends Component {
  getHelpers = () => {
    return _.map(this.props.matches, (match => {
      const pad = _.pad('',match.pos)
      const style = {
        backgroundColor: match.background || '#eeeeee',
        color: 'black'
      }
      const text = _.padEnd(match.name, match.seq.length)
      return(
        <div key={match.pos} className="helper">
          <span className="pad">{pad}</span>
          <span style={style}>{text}</span>
        </div>
      )
    }))
  }
  getHighlights = () => {

  }
  render() {
    const { forward, reverse } = this.props
    return (
      <div className="col-12">
        <div className="helpers sequence">
          {''}
          {this.getHelpers()}
        </div>
        <div className="sequence">{forward}
          
        </div>
        <div className="sequence">{reverse}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { forward, reverse } = getBothVectorStrands(state)
  const matches = getVectorRestrictionSites(state)
  console.log(matches)
  return {
    forward,
    reverse,
    matches
  }
}

export default connect(mapStateToProps)(Vector)