import React, { Component } from 'react'
import { connect } from 'react-redux'


class VectorForward extends Component {
  render() {
    return (
      <div>
        Do something
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(VectorForward)