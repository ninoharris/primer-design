import _ from 'lodash'
import React from 'react'

const HelperMarkers = ({ helpers }) => {
  const helpersList = _.map(helpers, (helper) => {
    const pad = _.pad('', helper.pos, ' ')
    const style = {
      color: helper.color || '#666666'
    }
    const text = _.padEnd(helper.name, helper.len)
    return (
      <div key={helper.pos} className="helper">
        <span className="pad">{pad}</span>
        <span style={style}>{text}</span>
      </div>
    )
  })
  return (
    <div className="helpers sequence">
      {helpersList}
    </div>
  )
}

export default HelperMarkers