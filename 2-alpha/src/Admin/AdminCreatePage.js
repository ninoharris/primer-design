import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addExercise } from '../actions/admin'
import ExerciseEditor from './ExerciseEditor'
import Header from './Header';

const data = {
  authorId: 'anon',
  lastModified: 0,
  createdAt: 0,
  questionPart1: '',
  questionPart2: '',
  haystack: '',
  vector: '',
  constructStart: 0,
  constructEnd: 0,
  vectorStart: 0,
  vectorEnd: 0,
  vectorContainsStart: true,
  vectorContainsEnd: true,
}

class AdminCreatePage extends Component {
  outerSubmit = (exerciseData) => {
    this.props.addExercise(exerciseData).then(() => {
      this.props.history.push('/admin') // uses react history object
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <Header title="Add new exercise" />
        <ExerciseEditor outerSubmit={this.outerSubmit} data={data} />
      </div>
    )
  }
} 

export default connect(null, { addExercise })(AdminCreatePage)