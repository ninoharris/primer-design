import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserVectorMatchForwardAlignment } from '../selectors'

class Evaluation extends Component {
  render() {
    if(this.props.loading) return (<div>

    </div>)
    const { matches, startFrame } = this.props
    console.log('Eval:', matches, startFrame)
    return (
      <div>
        <h4>Evalation:</h4>
        <pre>
          {JSON.stringify(this.props.result, null, 2)}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if(state.loading) return { loading: state.loading }
  return {
    result: getUserVectorMatchForwardAlignment
  }
}

export default connect(mapStateToProps)(Evaluation)