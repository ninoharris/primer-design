import _ from 'lodash'
import React from 'react'
import * as api from '../api'

const HighlightedSequence = ({ helpers, sequence, direction }) => {
  let lastIndex = 0, output = [] 
  
  // Only show valid helpers, sort by pos, and map to an array to be iterated over
  helpers
    .sort((a, b) => a.pos - b.pos)
    .filter(helper => helper.pos && helper.len)
    .forEach(({ pos, name, len, color }) => {
    if (pos > lastIndex) {
      output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex, pos)}</span>)
    }
    const text = sequence.substr(pos, len)
    const style = { color: api.pickTextColor(color), backgroundColor: color }
    output.push(<span key={pos} className={`hl ${direction}-hl ${name}`} style={style}>{text}</span>)
    lastIndex = len + pos
  })
  if (lastIndex < sequence.length) { // we're not done yet...
    output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex)}</span>)
  }
  return (<span className="Highlighted-Sequence sequence">{output}</span>)
}

export default HighlightedSequence