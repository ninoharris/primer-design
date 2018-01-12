import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserVectorMatchForwardAlignment, getUserVectorMatchesForward, getHaystackForwardMatches } from '../../selectors'

class EvaluationFV extends Component {
  render() {
    if (this.props.loading)
      return (<div> Loading... </div>)

    const { matches } = this.props
    // console.log(matches)
    return (
      <div>
        <h4>Evalation FG:</h4>
        <pre>{JSON.stringify(matches, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.loading) return { loading: state.loading }
  const matches = getHaystackForwardMatches(state)
  return {
    matches
  }
}

export default connect(mapStateToProps)(EvaluationFV)