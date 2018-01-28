import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { exercisesByIdSelector } from '../selectors' 

import Header from './Header'
import ExerciseEditor from './ExerciseEditor'

class AdminEditPage extends Component {
  render() {
    console.log('exercise for editing is: ', this.props.exercise)
    return (
      <div className="container-fluid">
        <Header />
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