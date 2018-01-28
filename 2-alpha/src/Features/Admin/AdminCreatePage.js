import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ExerciseEditor from './ExerciseEditor'

class AdminCreatePage extends Component {
  doSomething = (values) => {
    console.log(values)
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="Nav">
            <div className="Logo">
              <h2>Create an exercise</h2>
            </div>
            <div>
              <Link to="/admin"><button className="btn btn-primary">Back to home</button></Link>
            </div>
          </div>
        </div>
        <ExerciseEditor onSubmit={this.doSomething} />
      </div>
    )
  }
} 

export default connect()(AdminCreatePage)