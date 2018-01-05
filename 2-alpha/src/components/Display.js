import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestion} from '../selectors'

import Vector from './Vector'

class Display extends Component {
  render() {
    if(this.props.loading) {
      return <div className="loading">Loading...</div>
    }
    const { question } = this.props
    return (
      <div className="col-12">
        <strong>{question}</strong>
        <Vector />
        {/* <Haystack /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading } = state
  if (loading) return { loading }
  return { question: getQuestion(state) }
}

export default connect(mapStateToProps)(Display)