import React, { Component } from 'react'

import FV from './evaluations/FV'
import RV from './evaluations/RV'

class Evaluation extends Component {
  render() {
    return (
      <div>
        <FV />
        <RV />
      </div>
    )
  }
}

export default Evaluation