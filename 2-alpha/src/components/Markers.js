import _ from 'lodash'
import React from 'react'

const Markers = ({ markers = [], className, ...rest }) => {
  return (
    <div className={`${className} sequence`} {...rest}>
      {markers.map((marker, i) => {
        if (isNaN(marker)) return null
        return <span className="admin-marker" key={i}>{_.padStart('', marker, ' ')}</span>
      })}
    </div>
  )
}

export default Markers