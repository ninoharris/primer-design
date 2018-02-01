import _ from 'lodash'
import React from 'react'

const HelperPosition = ({ length, padLeft, interval = 3, lines = 5, className = '', ...rest, }) => {
  let positionHelpers = []
  for(let i = 1; i <= length; i++) {
    if(i % interval === 1) {
      positionHelpers.push(<span key={i}><span>{_.padEnd(String(i), 3)}</span>{_.pad('', interval, ' ')}</span>)
    }
  }
  return (
    <div className={`sequence sequence-line-big position-helper ${className}`} {...rest}>
    {padLeft ? <span className="sequence" style={{ lineHeight: lines }}>{_.pad('', padLeft)}</span> : ''}
    {positionHelpers}
  </div>)
}

export default HelperPosition