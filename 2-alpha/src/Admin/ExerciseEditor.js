import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';

import validate from './exerciseValidate'
import VectorPreview from './VectorPreview'
import HaystackPreview from './HaystackPreview'
import RestrictionSitesPreview from '../components/RestrictionSitesPreview';
import ColorPicker from './ColorPicker'

export class ExerciseEditor extends Component {
  state = {
    cursor: {
      'haystack': null,
      'vector': null,
    }
  }
  textareaInput = {} // textarea refs are captured so that we have the position of the user's text cursor as they're editing. this is used for preview markers.
  getCursorPosition = (el) => {
    const name = el.name
    const cursorPosition = this.textareaInput[name].selectionStart // get position of cursor when editing
    this.setState({ 
      cursor: { [name]: cursorPosition }
    })
  }

  renderField = ({ name, input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        <input {...input} id={input.name} placeholder={label} type={type} {...props} />
        {!pristine &&
          ((error && <span className="editor-error">{error}</span>) ||
            (warning && <span className="editor-warning">{warning}</span>))}
      </div>
    </div>
  )
  renderTextarea = ({ name, input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <div className="">
      <label htmlFor={input.name}>{label}</label>
      <div>
        <textarea 
          {...input}
          id={input.name} 
          ref={(el => this.textareaInput[input.name] = el)}
          onClick={(event) => this.getCursorPosition(event.target)}
          onKeyUp={(event) => this.getCursorPosition(event.target)}
          onKeyDown={(event) => this.getCursorPosition(event.target)}
          placeholder={label} 
          type={type} 
          {...props} 
        />
        {!pristine &&
          ((error && <span className="editor-error">{error}</span>) ||
            (warning && <span className="editor-warning">{warning}</span>))}
      </div>
    </div>
  )
  // renderSequence = (props) TODO
  renderCheckbox = ({ input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <div className="editor-checkbox">
      <div>
        <input {...input} id={input.name} placeholder={label} type={type} {...props} />
        <label htmlFor={input.name}>{label}</label>
      </div>
      <div>
        {!pristine &&
          ((error && <span className="editor-error">{error}</span>) ||
            (warning && <span className="editor-warning">{warning}</span>))}
      </div>
    </div>
  )
  renderHelpers = ({ fields, meta: { error, submitted }}) => {
    return (
      <ul className="list-group editor-helpers">
        {fields.map((helper, i) => (
          <li key={i} className="list-group-item">
            <button type="button" style={{position: 'absolute', right: -10, backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', zIndex: 10}} onClick={() => fields.remove(i)}>X</button>
            <div className="row">
              <div className="col-6"><Field name={`${helper}.name`} type="text" component={this.renderField} label="Helper text" /></div>
              <div className="col-6"><Field name={`${helper}.pos`} type="number" component={this.renderField} label="Start position" /></div>
            </div>
            <div className="row">
              <div className="col-6"><Field name={`${helper}.len`} type="number" component={this.renderField} label="NT length" /></div>
              <div className="col-6">
                <Field name={`${helper}.color`} component={ColorPicker} type="text" label="Color (#FF0000)" defaultValue="#FF0000" />
              </div>
            </div>
          </li>
        ))}
        {error && <li className="editor-error">{error}</li>}
        <li className="text-center mt-3">
          <button type="button" onClick={() => fields.push({})} className="btn btn-success">Add helper</button>
        </li>
      </ul>
    )
  }
  render() {
    const { pristine, submitting, submitText = 'Create exercise', fusionStart, fusionEnd } = this.props
    const { haystack: haystackCursorPosition, vector: vectorCursorPosition } = this.state.cursor
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
                <Field component={this.renderCheckbox} type="checkbox" name="fusionStart" label="Fusion protein at start" />
                {!fusionStart && 
                  <Field component={this.renderCheckbox} type="checkbox" name="userProvidesStartCodon" label="User provides start" />
                }
                {fusionStart && 
                  <Field component={this.renderField} className="form-control" type="number" name="vectorStart" label="Start Position" />
                }
              </div>
              <div className="col-6">
                <Field component={this.renderCheckbox} type="checkbox" name="fusionEnd" label="Fusion protein at end" />
                {!fusionEnd &&
                  <Field component={this.renderCheckbox} type="checkbox" name="userProvidesStopCodon" label="User provides stop" />
                }
                {fusionEnd && 
                  <Field component={this.renderField} className="form-control" type="number" name="vectorEnd" label="End Position" />
                }
              </div>
              {(!fusionEnd || !fusionStart) &&
                <div className="col-12 mt-2"><div className="editor-warning ">'User provides stop/start': application checks if start/stop codon(s) have been added.</div></div>
              }
            </div>
            <FieldArray name="helpers" component={this.renderHelpers} />
            <RestrictionSitesPreview />
          </div>
          <div className="col-8">
            <div className="form-group">
              <Field className="form-control" name="questionPart1" component={this.renderTextarea} type="text" label="Question part 1: This introduces the general question and information about the vector." />
            </div>
            <div className="form-group">
              <Field className="form-control vectorInput" name="vector" component={this.renderTextarea} type="text" label="Vector forward sequence (reverse is calculated)" />
            </div>
            <VectorPreview cursorPosition={vectorCursorPosition} />
            <div className="form-group">
              <Field className="form-control" name="questionPart2" component={this.renderTextarea} type="text" label="Question part 2: This contains information specific to the construct below." />
            </div>
            <div className="form-group">
              <label className="d-block" htmlFor="haystack"></label>
              <Field className="form-control haystackInput" 
                name="haystack"
                component={this.renderTextarea} type="text" rows="6" 
                label="Haystack forward sequence (reverse is calculated)" />
            </div>
            <HaystackPreview cursorPosition={haystackCursorPosition}/>
            <button type="submit" disabled={pristine || submitting}>{submitText}</button>
          </div>
        </div>
      </form>
    )
  }
}

const ExerciseEditorWithReduxForm = reduxForm({
  form: 'exerciseEditor',
  validate,
})(ExerciseEditor)
const selector = formValueSelector('exerciseEditor')


const mapStateToProps = (state, ownProps) => {
  const { data = {}, outerSubmit } = ownProps
  // Setup initial data, such as from editing (not creating) an exercise
  const helpersArray = _.keys(data.helpers).map(pos => ({ ...data.helpers[pos] }))
  const initialValues = {
    ...data,
    helpers: helpersArray,
  }
  const createdAt = data.createdAt || moment().valueOf()

  // Get value of isFusionStart and isFusionEnd
  const fusionStart = selector(state, 'fusionStart')
  const fusionEnd = selector(state, 'fusionEnd')

  const onSubmit = (values) => {
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
      fusionStart: !!values.fusionStart,
      fusionEnd: !!values.fusionEnd,
      helpers: helpersObject,
      userProvidesStartCodon: values.userProvidesStartCodon || false,
      userProvidesStopCodon: values.userProvidesStopCodon || false,
    }
    console.log('Exercise data: ', exerciseData)
    outerSubmit(exerciseData)
  }

  return {
    initialValues,
    onSubmit,
    fusionStart,
    fusionEnd,
  }
}

export default connect(mapStateToProps)(ExerciseEditorWithReduxForm)