import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserVectorMatchReverse } from '../../selectors'

class EvaluationRV extends Component {
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
    match: getUserVectorMatchReverse(state)
  }
}

export default connect(mapStateToProps)(EvaluationRV)