import React, { Component } from 'react'
import { connect } from 'react-redux'

const errors = {}



class Evaluation extends Component {
  render() {
    return (
      <div>I am evaluation</div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default connect(mapStateToProps)(Evaluation)