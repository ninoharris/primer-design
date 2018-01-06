import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getHaystackReverseMatches } from '../../selectors'

class EvaluationRG extends Component {
  render() {
    if (this.props.loading)
      return (<div> Loading... </div>)

    const { matches } = this.props
    // console.log(matches)
    return (
      <div>
        <h4>Evalation RG:</h4>
        <pre>{JSON.stringify(matches, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.loading) return { loading: state.loading }
  const matches = getHaystackReverseMatches(state)
  return {
    matches
  }
}

export default connect(mapStateToProps)(EvaluationRG)