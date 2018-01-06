import _ from 'lodash'
import React from 'react'

const HelperPosition = ({length, ...rest}) => {
  let positionHelpers = []
  for(let i = 1; i <= length; i++) {
    if(i % 3 === 1) {
      positionHelpers.push(<span key={i}><span>{_.padEnd(i, 3)}</span>{'   '}</span>)
    }
  }
  return (
  <div className="sequence position-helper" {...rest}>
    {positionHelpers}
  </div>)
}

export default HelperPosition