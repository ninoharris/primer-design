import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserVectorMatchForward } from '../../selectors'

class EvaluationFV extends Component {
  render() {
    if (this.props.loading) {
      return (<div> Loading... </div>)
    }
    return (
      <div>
        <h4>Evaluation FV:</h4>
        <pre>{JSON.stringify(this.props.match, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.loading) return { loading: state.loading }
  return {
    match: getUserVectorMatchForward(state)
  }
}

export default connect(mapStateToProps)(EvaluationFV)