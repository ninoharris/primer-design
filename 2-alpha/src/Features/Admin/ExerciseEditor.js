import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import moment from 'moment'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addExercise } from '../../actions/admin'

// Below should ALL be taken out
import { Left3, Left5, Right3, Right5 } from '../../components/HelperEnds'
import Codons from '../../components/Codons'
import HelperPosition from '../../components/HelperPosition'
import * as api from '../../api'

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
  render() {
    console.log('rerender!')
    const { handleSubmit, pristine, submitting, submitText = 'Create exercise', haystack, vector } = this.props
    return (
      <form onSubmit={this.props.handleSubmit} className="Admin-Exercise-Form" method="POST">
        <div className="row">
          <div className="col-4">
            Sidebar. Will contain: haystack start, end. vector start, end. helpers (pos, length, name, color).
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
            <div className="haystack admin-haystack">
              <HelperPosition length={100} />
              <div className="forward">
                <div className="multiline">
                  <div className="sequence">
                    <Left5 />{haystack.forward}<Right3 />
                  </div>
                </div>
              </div>
              <div className="reverse">
                <div className="multiline">
                  <div className="sequence">
                    <Left3 />{haystack.reverse}<Right5 />
                  </div>
                  <Codons seq={haystack.forward} />
                </div>
              </div>
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

const selector = formValueSelector('exerciseEditor')

const mapStateToProps = (state, ownProps) => {
  const { haystack = ' ', vector = ' ' } = selector(state, 'haystack', 'vector')
  const previews = {
    haystack: {
      forward: haystack,
      reverse: api.complementFromString(haystack),
    },
    vector: {
      forward: vector,
      reverse: api.complementFromString(vector)
    },
    helpers: {
    }
  }
  return { ...previews, initialValues: ownProps.data}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onSubmit = (values) => {
    const newPost = !ownProps.id
    const id = ownProps.id || v4()
    const payload = {
      [id]: {
        id,
        authorId: 'sedm4648',
        lastModified: moment(),
        createdAt: ownProps.createdAt || moment(),
        question: {
          part1: values.questionPart1,
          part2: values.questionPart2,
        },
        haystack: values.haystack,
        vector: values.vector,
        constructStart: values.constructStart,
        constructEnd: values.constructEnd,
        vectorStart: values.vectorStart,
        vectorEnd: values.vectorEnd,
        vectorContainsStart: values.vectorContainsStart,
        vectorContainsEnd: values.vectorContainsEnd,
      }
    }
    if(newPost) {
      dispatch(addExercise({ payload }))
    } else {
      console.log('existing post with id of:', id, 'and content of:', payload)
    }
  }
  
  return { onSubmit }
}

ExerciseEditor = connect(mapStateToProps, mapDispatchToProps)(ExerciseEditor)

export default ExerciseEditor