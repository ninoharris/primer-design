import React, { Component } from 'react'

import FV from './FV'
import RV from './RV'
import FG from './FG'
import RG from './RG'

class Evaluation extends Component {
  render() {
    return null
    return (
      <div className="evaluations row">
        <div className="col-3">
          <FV />
        </div>
        <div className="col-3">
          <RV />
        </div>
        <div className="col-3">
          <FG />
        </div>
        <div className="col-3">
          <RG />
        </div>
      </div>
    )
  }
}

export default Evaluation
