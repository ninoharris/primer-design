import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { transparentize, lighten, readableColor } from 'polished'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';

// selectors and validators
import validate from './exerciseValidate'
import { getCurrentAuthorUid } from '../selectors/admin'

// Components
import theme from '../styles/theme'
import VectorPreview from './VectorPreview'
import HaystackPreview from './HaystackPreview'
import RestrictionSitesPreview from '../components/RestrictionSitesPreview';
import ColorPicker from './ColorPicker'
import { P, PNoMargins } from '../components/Text'
import { HighlightButton, SecondaryButton } from '../components/Button'
import { RaisedBox, Row } from '../components/Container';
import { Checkbox } from '../components/Checkbox'

const Input = RaisedBox.withComponent('input').extend`
  border: 0;
  padding: 0.3rem;
  font-family: ${p => p.theme.sequenceFont};
`

const ErrorContainer = RaisedBox.extend`
  background-color: ${p => p.theme.error};
  color: ${p => p.theme.white};
  padding: 0.2rem;
`

let Label = PNoMargins.withComponent('label')
Label = Label.extend`
  font-weight: bold;
`

const Form = styled.form`
  display: flex;
`
const FormGroup = styled.div`
  margin-bottom: 2rem;
  > * {
    margin-bottom: 0.26rem;
  }
`

const Main = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`

const Sidebar = styled.div`
  background-color: ${p => transparentize(0.9, p.theme.darkerGrey)};
  width: 300px;
  padding: 1rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 2rem;
  border: 0;
  font-family: ${p => p.theme.sequenceFont};
  color: ${p => p.theme.darkerGrey};
  background: ${p => transparentize(0.4, p.theme.white)};
  &:focus, &:hover {
    background: ${p => p.theme.white};
  }
  &::placeholder {
    color: ${p => lighten(0.2, p.theme.darkerGrey)}
  }
`
const FieldContainer = RaisedBox.extend`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: ${p => p.color || p.theme.purple};
  &&& input {
    width: 30%;
    color: ${p => p.color};
    font-family: ${p => p.theme.sequenceFont};
    padding: 0.4rem 0.7rem;
    border: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${p => p.theme.white};
  }
  & label {
    padding: 0.4rem 0.7rem;
    color: ${p => p.theme.white};
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    padding: 0.4rem 0.7rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    line-height: 1.5rem;
  }
  input {
    margin-right: 0.5rem;
  }
  label {
    color: ${p => p.theme.textDefault};
  }
`

const Nested = styled.div`
  margin-left: 2rem;
`

const HelpersContainer = styled.ul`
  > * {
    margin-bottom: 1rem;
  }
`
const Helper = styled.li`
  position: relative;
  border-radius: 4px;
  padding: 0.7rem;
  background: ${p => transparentize(0.2, p.theme.grey)};
  box-shadow: rgba(0,0,0,0.12) 0 0 2px 2px;
  input {
    width: 90%;
  }
`

const RemoveHelper = styled.button`
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  height: 1.2rem;
  width: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.6rem;
  text-align: center;
  background-color: ${p => lighten(0.1, p.theme.error)};
  color: ${p => p.theme.white};
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  z-index: 10;
`

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
      <Label htmlFor={input.name}>{label}</Label>
      <Input {...input} id={input.name} placeholder={label} type={type} {...props} />
      {touched &&
        ((error && <ErrorContainer>{error}</ErrorContainer>) ||
          (warning && <span className="editor-warning">{warning}</span>))}
    </div>
  )
  renderColoredField = ({ color, name, input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <div>
      <FieldContainer color={color}>
        <Label htmlFor={input.name}>{label}</Label>
          <input {...input} id={input.name} placeholder={label} type={type} {...props} />
      </FieldContainer>
      {touched &&
        ((error && <ErrorContainer>{error}</ErrorContainer>) ||
          (warning && <span className="editor-warning">{warning}</span>))}
    </div>
  )
  renderTextarea = ({ name, input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <div>
      <Label htmlFor={input.name}>{label}</Label>
        <TextArea
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
        {touched &&
          ((error && <ErrorContainer>{error}</ErrorContainer>) ||
            (warning && <span className="editor-warning">{warning}</span>))}
    </div>
  )
  renderCheckbox = ({ input, label, type, meta: { pristine, touched, error, warning }, ...props }) => (
    <CheckboxContainer>
      <Checkbox name={input.name} id={input.name} label={label} type="checkbox" {...input} {...props} />
      {!pristine &&
        ((error && <ErrorContainer>{error}</ErrorContainer>) ||
          (warning && <span className="editor-warning">{warning}</span>))}
    </CheckboxContainer>
  )
  renderHelpers = ({ fields, meta: { error, submitted }}) => {
    return (
      <HelpersContainer>
        {fields.map((helper, i) => (
          <Helper key={i}>
            <RemoveHelper onClick={() => fields.remove(i)}>X</RemoveHelper>
            <Row>
              <Field name={`${helper}.name`} type="text" component={this.renderField} label="Helper text" />
              <Field name={`${helper}.color`} component={ColorPicker} type="text" label="Colour" defaultValue="#FF0000" />
            </Row>
            <Row>
              <Field name={`${helper}.pos`} type="number" component={this.renderField} label="Vector position" />
              <Field name={`${helper}.len`} type="number" component={this.renderField} label="NT length" />
            </Row>
          </Helper>
        ))}
        {error && <li><ErrorContainer>{error}</ErrorContainer></li>}
        <li><SecondaryButton onClick={() => fields.push({})}>Add helper</SecondaryButton></li>
      </HelpersContainer>
    )
  }
  render() {
    const { pristine, submitting, submitText = 'Create exercise', fusionStart, fusionEnd } = this.props
    const { haystack: haystackCursorPosition, vector: vectorCursorPosition } = this.state.cursor
    return (
      <Form onSubmit={this.props.handleSubmit} method="POST">
        
        <Sidebar>
          <FormGroup>
            <PNoMargins><strong>Vector conditions</strong></PNoMargins>
              <Field component={this.renderCheckbox} type="checkbox" name="fusionStart" label="Fusion protein at start" />
              <Nested>
                {fusionStart ?
                  <Field color={theme.FV} component={this.renderColoredField} type="number" name="vectorStart" label="Start Position" /> :
                  <Field component={this.renderCheckbox} type="checkbox" name="userProvidesStartCodon" label="User provides start" />
                }
              </Nested>
              <Field component={this.renderCheckbox} type="checkbox" name="fusionEnd" label="Fusion protein at end" />
              <Nested>
                {fusionEnd ?
                  <Field color={theme.FG} component={this.renderColoredField} type="number" name="vectorEnd" label="End Position" /> :
                  <Field component={this.renderCheckbox} type="checkbox" name="userProvidesStopCodon" label="User provides stop" />
                }
              </Nested>
          </FormGroup>
          <FormGroup>
            <PNoMargins><strong>Additional helpers in MCS/Vector</strong></PNoMargins>
            <FieldArray name="helpers" component={this.renderHelpers} />
          </FormGroup>
          <FormGroup>
            <PNoMargins><strong>Sequence of interest details</strong></PNoMargins>
            <Field color={theme.RV} component={this.renderColoredField} type="number" name="constructStart" label="SOI start Position" />
            <Field color={theme.RG} component={this.renderColoredField} type="number" name="constructEnd" label="SOI end Position" />
          </FormGroup>
          {/* <FormGroup>
            <RestrictionSitesPreview />
          </FormGroup> */}
          <HighlightButton type="submit" disabled={pristine || submitting}>{submitText}</HighlightButton>
        </Sidebar>

        <Main>
          <Field name="questionPart1" component={this.renderTextarea} type="text" label="Question part 1: This introduces the general question and information about the vector." />
          <Field name="vector" component={this.renderTextarea} type="text" label="Vector forward sequence (reverse is calculated)" />
          <VectorPreview cursorPosition={vectorCursorPosition} />
          <Field name="questionPart2" component={this.renderTextarea} type="text" label="Question part 2: This contains information specific to the construct below." />
          <Field name="haystack" component={this.renderTextarea} type="text" rows="6" label="Haystack forward sequence (reverse is calculated)" />
          <HaystackPreview cursorPosition={haystackCursorPosition}/>
        </Main>
                

              
      </Form>
    )
  }
}

/* {(!fusionEnd || !fusionStart) &&
                <div className="col-12 mt-2"><div className="editor-warning ">'User provides stop/start': application checks if start/stop codon(s) have been added.</div></div>
              } */

const ExerciseEditorConnected = reduxForm({
  form: 'exerciseEditor',
  validate,
})(ExerciseEditor)
const selector = formValueSelector('exerciseEditor')


const mapStateToProps = (state, ownProps) => {
  const { data = {}, outerSubmit } = ownProps
  const authorId = ownProps.authorId || getCurrentAuthorUid(state)

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
      authorId,
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
    // console.log('Exercise data: ', exerciseData)
    outerSubmit(exerciseData)
  }

  return {
    initialValues,
    onSubmit,
    fusionStart,
    fusionEnd,
  }
}

export default connect(mapStateToProps)(ExerciseEditorConnected)