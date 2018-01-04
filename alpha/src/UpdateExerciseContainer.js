import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import ExerciseEditor from './ExerciseEditor'

class UpdateExerciseContainer extends Component {
  state = {
    message: null,
  }
  handleExerciseUpdate = (data, _id) => {
    axios.put(`http://localhost:3005/exercise/${_id}`, data).then(() => {
      this.setState({
        message: 'Just updated'
      })
      setTimeout(() => {
        this.setState({ message: null, })
      }, 3000)
    })
  }
  render() {
    const { _id } = this.props.match.params
    const message = this.state.message ? <strong>{this.state.message}</strong> : null
    console.log('Container:',_id)
    return (
    <div>
      <h2>Updating component: {_id}</h2>
      {message}
      <ExerciseEditor _id={_id} onSubmit={this.handleExerciseUpdate} />
    </div>)
  }
}

export default withRouter(UpdateExerciseContainer)