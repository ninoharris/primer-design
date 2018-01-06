import React, { Component } from 'react'

import FV from './evaluations/FV'
import RV from './evaluations/RV'
import FG from './evaluations/FG'
import RG from './evaluations/RG'

class Evaluation extends Component {
  render() {
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
