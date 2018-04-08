import _ from 'lodash'
import React from 'react'
import { darken } from 'polished'

// A marker is an indicator of position, such as the start of a construct or end.

const HelperMarkers = ({ helpers }) => {
  const helpersList = helpers.map((helper) => {
    if(!helper.pos || !helper.len) return null
    const pad = _.pad('', helper.pos, ' ')
    const style = {
      color: darken(0.2, helper.color) || '#666666'
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