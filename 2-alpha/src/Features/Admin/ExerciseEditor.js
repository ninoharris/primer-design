import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';

class ExerciseEditor extends Component {
  render() {
    const { handleSubmit, pristine, submitting, submitText = 'Create exercise' } = this.props
    return (
      <form onSubmit={this.props.handleSubmit} className="Admin-Exercise-Form">
        <div className="row">
          <div className="col-4">
            Sidebar. Will contain: haystack start, end. vector start, end. helpers (pos, length, name, color).
          </div>
          <div className="col-8">
            <div className="form-group">
              <label className="d-block" htmlFor="question-part1">Question part 1</label>
              <Field className="form-control" name="question-part1" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="vector">Vector forward sequence</label>
              <Field className="form-control" name="vector" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="question-part2">Question part 2</label>
              <Field className="form-control" name="question-part2" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="haystack">Haystack forward sequence</label>
              <Field className="form-control" name="haystack" component="textarea" type="text" />
            </div>
            <button type="submit" disabled={pristine || submitting}>{submitText}</button>
          </div>
        </div>
      </form>
    )
  }
}

ExerciseEditor = reduxForm({
  form: 'exerciseEditor',
})(ExerciseEditor)

export default ExerciseEditor