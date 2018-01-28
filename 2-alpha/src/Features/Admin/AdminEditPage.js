import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { exercisesByIdSelector } from '../../selectors' 

import ExerciseEditor from './ExerciseEditor'

class AdminEditPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="Nav">
            <div className="Logo">
              <h2>Updating exercise:</h2>
            </div>
            <div>
              <Link to="/admin"><button className="btn btn-primary">Back to home</button></Link>
            </div>
          </div>
        </div>
        <ExerciseEditor onSubmit={this.doSomething} data={this.props.exercise} />
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  console.log(exercisesByIdSelector(match.params.id))
  return {
    data: exercisesByIdSelector(match.params.id)
  }
}

export default withRouter(connect(mapStateToProps)(AdminEditPage))