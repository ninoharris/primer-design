import React, { Component } from 'react'
import { connect } from 'react-redux'

import FV from './FV'
import RV from './RV'
import FG from './FG'
import RG from './RG'
import { getCurrentExercise } from '../../selectors/index';

class Evaluation extends Component {
  render() {
    return (
      <div>
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
        <div className="evaluations row">
          <div className="col-12">
            <pre>{JSON.stringify(this.props.exerciseData, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exerciseData: getCurrentExercise(state)
  }
}

export default connect(mapStateToProps)(Evaluation)
