import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getCurrentExercise, 
  getHaystackForwardMatches, 
  getHaystackReverseMatches,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
 } from '../../selectors/index';

class Evaluation extends Component {
  renderEval(title, matches) {
    return (
      <div>
        <h4>Evalation {title}:</h4>
        <pre>{JSON.stringify(matches, null, 2)}</pre>
      </div>
    )
  }
  render() {
    return (
      <div>
        <div className="evaluations row">
          <div className="col-3">
            {this.renderEval('FV', this.props.FVMatches)}
          </div>
          <div className="col-3">
            {this.renderEval('RV', this.props.RVMatches)}
          </div>
          <div className="col-3">
            {this.renderEval('FG', this.props.FGMatches)}
          </div>
          <div className="col-3">
            {this.renderEval('RG', this.props.RGMatches)}
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
    exerciseData: getCurrentExercise(state),

    FGMatches: getHaystackForwardMatches(state), 
    RGMatches: getHaystackReverseMatches(state),
    FVMatches: getUserVectorMatchForward(state),
    RVMatches: getUserVectorMatchReverse(state),
  }
}

export default connect(mapStateToProps)(Evaluation)
