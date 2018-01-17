import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Left3, Left5, Right3, Right5 } from '../../components/HelperEnds'
import Codons from '../../components/Codons'
import HelperPosition from '../../components/HelperPosition'
import * as api from '../../api'

class ExerciseEditor extends Component {
  
  render() {
    console.log('rerender!')
    const { handleSubmit, pristine, submitting, submitText = 'Create exercise', haystack, vector } = this.props
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
              <Field className="form-control vector-input" name="vector" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="question-part2">Question part 2</label>
              <Field className="form-control" name="question-part2" component="textarea" type="text" />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="haystack">Haystack forward sequence</label>
              <Field className="form-control haystack-input" name="haystack" component="textarea" type="text" />
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

ExerciseEditor = connect(
  state => {
    const { haystack = '', vector = ''} = selector(state, 'haystack', 'vector')
    return {
      haystack: {
        forward: haystack,
        reverse: api.complementFromString(haystack),
      },
      vector: {
        forward: vector,
        reverse: api.complementFromString(vector)
      }
    }
  }
)(ExerciseEditor)

export default ExerciseEditor