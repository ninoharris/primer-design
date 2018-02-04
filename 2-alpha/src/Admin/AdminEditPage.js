import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getExercise } from '../selectors' 
import { updateExercise, startRemoveExercise } from '../actions/admin'

import Header from './Header'
import ExerciseEditor from './ExerciseEditor'

class AdminEditPage extends Component {
  outerSubmit = (values) => {
    const id = this.props.id
    this.props.updateExercise(id, values).then(() => {
      this.props.history.push('/admin')
    })
  }
  removeExercise = () => {
    const carryOn = window.confirm('Are you sure? This cant be undone')
    if(carryOn) {
      this.props.startRemoveExercise(this.props.id).then(() => {
        this.props.history.push('/admin')
      })
    }
  }
  render() {
    const { id } = this.props
    return (
      <div className="container-fluid">
        <Header title={`Editing exercise with id: ${id}`}>
          <button onClick={this.removeExercise} className="btn btn-danger mr-2">Delete exercise</button>
        </Header>
        <ExerciseEditor outerSubmit={this.outerSubmit} data={this.props.exercise} submitText='Update exercise' />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const exercise = getExercise(state, { id })
  console.log('exercise is:', exercise)
  return {
    exercise,
    id,
  }
}

export default withRouter(connect(mapStateToProps, { updateExercise, startRemoveExercise })(AdminEditPage))