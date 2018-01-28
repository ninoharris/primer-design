import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Field, FieldArray, reduxForm } from 'redux-form';

import HaystackPreview from './HaystackPreview'

class ExerciseEditor extends Component {
  renderField = ({ name, input, label, type, meta: { touched, error, warning }, ...props }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input {...input} id={name} placeholder={label} type={type} {...props} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
  renderHelpers = ({ fields, meta: { error, submitted }}) => {
    return (
      <ul className="list-group">
        {fields.map((helper, i) => (
          <li key={i} className="list-group-item">
            <button type="button" style={{position: 'absolute', right: -10, backgroundColor: 'red', color: 'white', border: 'none'}} onClick={() => fields.remove(i)}>X</button>
            <div className="row">
              <div className="col-6"><Field name={`${helper}.name`} type="text" component={this.renderField} label="Helper text" /></div>
              <div className="col-6"><Field name={`${helper}.pos`} type="number" component={this.renderField} label="Start position" /></div>
            </div>
            <div className="row">
              <div className="col-6"><Field name={`${helper}.len`} type="number" component={this.renderField} label="NT length" /></div>
              <div className="col-6"><Field name={`${helper}.color`} type="text" component={this.renderField} label="Color (#FF0000)" /></div>
            </div>
          </li>
        ))}
        <li className="text-center mt-3">
          <button type="button" onClick={() => fields.push({})} className="btn btn-success">Add helper</button>
        </li>
      </ul>
    )
  }
  render() {
    const { pristine, submitting, submitText = 'Create exercise' } = this.props
    return (
      <form onSubmit={this.props.handleSubmit} className="Admin-Exercise-Form" method="POST">
        <div className="row">
          <div className="col-4">
            <div className="row mb-3">
              <div className="col-12"><strong>Haystack</strong></div>
              <div className="col-6">
                <Field component={this.renderField} className="form-control" type="number" name="constructStart" label="Start Position" />
              </div>
              <div className="col-6">
                <Field component={this.renderField} className="form-control" type="number" name="constructEnd" label="End Position" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12"><strong>Vector</strong></div>
              <div className="col-6">
                <Field component={this.renderField} className="form-control" type="checkbox" name="vectorContainsStart" label="Fusion protein at start" />
                <Field component={this.renderField} className="form-control" type="number" name="vectorStart" label="Start Position" />
              </div>
              <div className="col-6">
                <Field component={this.renderField} className="form-control" type="checkbox" name="vectorContainsEnd" label="Fusion protein at end" />
                <Field component={this.renderField} className="form-control" type="number" name="vectorEnd" label="End Position" />
              </div>
            </div>
            <div>
              <FieldArray name="helpers" component={this.renderHelpers} />
            </div>
          </div>
          <div className="col-8">
            <div className="form-group">
              <label className="d-block" htmlFor="questionPart1">Question part 1</label>
              <Field className="form-control" name="questionPart1" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="vector">Vector forward sequence</label>
              <Field className="form-control vectorInput" name="vector" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="questionPart2">Question part 2</label>
              <Field className="form-control" name="questionPart2" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="haystack">Haystack forward sequence</label>
              <Field className="form-control haystackInput" name="haystack" component="textarea" type="text" />
            </div>
            {/* <HaystackPreview /> */}
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



const mapStateToProps = (state, ownProps) => {
  const { data = {}, outerSubmit } = ownProps
  const helpersArray = _.keys(data.helpers).map(pos => ({ ...data.helpers[pos] }))
  const initialValues = {
    ...data,
    helpers: helpersArray,
  }
  const onSubmit = (values) => {
    const createdAt = ownProps.createdAt || moment().valueOf()

    // convert helpers array to an object
    const helpersObject = values.helpers.reduce((prev, helper) => ({
      ...prev,
      [helper.pos]: {
        name: helper.name,
        pos: parseInt(helper.pos, 10),
        len: parseInt(helper.len, 10),
        color: helper.color,
      }
    }), {})
    const exerciseData = {
      authorId: 'sedm4648',
      lastModified: moment().valueOf(),
      createdAt,
      questionPart1: values.questionPart1,
      questionPart2: values.questionPart2,
      haystack: values.haystack,
      vector: values.vector,
      constructStart: parseInt(values.constructStart, 10),
      constructEnd: parseInt(values.constructEnd, 10),
      vectorStart: parseInt(values.vectorStart, 10),
      vectorEnd: parseInt(values.vectorEnd, 10),
      vectorContainsStart: !!values.vectorContainsStart,
      vectorContainsEnd: !!values.vectorContainsEnd,
      helpers: helpersObject,
    }
    console.log('Exercise data: ', exerciseData)
    outerSubmit(exerciseData)
  }
  return {
    initialValues,
    onSubmit,
  }
}

ExerciseEditor = connect(mapStateToProps)(ExerciseEditor)

export default ExerciseEditor