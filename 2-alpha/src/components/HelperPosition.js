import _ from 'lodash'
import React from 'react'

const HelperPosition = ({length, padLeft, ...rest, interval = 3}) => {
  let positionHelpers = []
  for(let i = 1; i <= length; i++) {
    if(i % interval === 1) {
      positionHelpers.push(<span key={i}><span>{_.padEnd(String(i).slice(-2), 3)}</span>{_.pad('', interval, ' ')}</span>)
    }
  }
  return (
    <div className="sequence sequence-line-big position-helper" {...rest}>
    {padLeft ? <span className="sequence">{_.pad('', padLeft)}</span> : ''}
    {positionHelpers}
  </div>)
}

export default HelperPosition