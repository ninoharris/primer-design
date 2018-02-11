import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addExercise } from '../actions/admin'
import ExerciseEditor from './ExerciseEditor'
import AdminHeader from './AdminHeader';

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
  fusionStart: true,
  fusionEnd: true,
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
        <AdminHeader title="Add new exercise" />
        <ExerciseEditor outerSubmit={this.outerSubmit} data={data} />
      </div>
    )
  }
} 

export default connect(null, { addExercise })(AdminCreatePage)