import React, { Component } from 'react'

import util from '../utils/util'
import plasmid from '../utils/plasmid'

//plasmidSeq, startPos, endPos, matches

export default class Display extends Component {
  onChange = (e) => {
    const { value, name } = e.target
    const cleanValue = value.toUpperCase().replace(/[^ATGC]/g, '')
    this.props.onChange(name, cleanValue)
  }
  displayMatches = (matches) => {
    let i = 0
    return matches.map(m => {
      console.log(m)
      const bufferText = new Array(m.matchPos + 1).join(' ');
      const buffer = <span className="buffer">{bufferText}</span>
      const match = (
      <span
        className="match" 
        style={{
          background: `rgba(${m.color}, 0.4)`,
          borderColor: `rgba(${m.color}, 0.8)`,
        }}
      >
        {/* m.seq */ new Array(m.length + 1).join(' ')}
      </span>
      )
      const helper = <span className="helper">{m.REName}</span>
      return (
        <span key={i++} className="matchContainer">
          {buffer}
            <span className="leftAlign">
            {match}
            {helper}
            </span>
        </span>
      )
    })
  }
  render() {
    const { plasmidSeq, startPos, endPos, matches } = this.props

    const matchOverlays = this.displayMatches(plasmid.getRESites(plasmidSeq))
    return (
      <div>
        <textarea 
          value={plasmidSeq} 
          name="plasmidSeq" 
          placeholder="Enter plasmid sequence here..." 
          cols="120"
          rows="1"
          style={{ resize: 'none' }}
          onChange={this.onChange}
          />
          <div className="display">
            {plasmidSeq.length > 0 ? util.complementFromString(plasmidSeq) : null}
            <div className="abs">
              {matchOverlays}
            </div>
          </div>
          
      </div>
    )
  }
}