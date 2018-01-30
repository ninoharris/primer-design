import _ from 'lodash'
import React from 'react'
import * as api from '../api'

const HighlightedSequence = ({ helpers, sequence, direction }) => {
  let lastIndex = 0, output = []
  
  // Only show valid helpers, sort by pos, and map to an array to be iterated over
  const helpersList = _.keys(helpers, 'pos')
    .sort((a,b) => a - b)
    .map(pos => helpers[pos])
    .filter(helper => helper.pos && helper.len)

  helpersList.map(({ pos, name, len, color }) => {
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
  return output
}

export default HighlightedSequence