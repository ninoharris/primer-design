import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkStudentExists, getStudent } from '../../actions'

export class Welcome extends Component {
  state = {
    error: null,
  }
  render() {
    return (
      <div className="text-center">
        <h3>Welcome to primer designer</h3>
      </div>
    )
  }
}

export default connect(null, { checkStudentExists, })