import _ from 'lodash'
import React from 'react'

const HelperPosition = ({length, padLeft, ...rest}) => {
  let positionHelpers = []
  for(let i = 1; i <= length; i++) {
    if(i % 3 === 1) {
      positionHelpers.push(<span key={i}><span>{_.padEnd(String(i).slice(-2), 3)}</span>{'   '}</span>)
    }
  }
  return (
  <div className="sequence sequence-102 position-helper" {...rest}>
    {padLeft ? <span className="sequence">{_.pad('', padLeft)}</span> : ''}
    {positionHelpers}
  </div>)
}

export default HelperPosition