import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserVectorMatchReverseAlignment, getUserVectorMatchesReverse } from '../../selectors'

class EvaluationRV extends Component {
  renderMismatch = () => {
    return (
      <div>
        Matches: {this.props.matches.length}
      </div>
    )
  }
  renderMatch = () => {
    return (
      <pre>
        {JSON.stringify(this.props.result, null, 2)}
      </pre>
    )
  }
  render() {
    if (this.props.loading)
      return (<div> Loading... </div>)

    const { matches } = this.props
    if (Array.isArray(matches)) return this.renderMismatch()

    return (
      <div>
        <h4>Evalation RV:</h4>
        {this.renderMatch()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.loading) return { loading: state.loading }
  const matches = getUserVectorMatchesReverse(state)
  if (Array.isArray(matches)) return { matches, isNotOnlyOneMatch: true }
  return {
    result: getUserVectorMatchReverseAlignment(state)
  }
}

export default connect(mapStateToProps)(EvaluationRV)