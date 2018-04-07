import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateInput, beginAnimatePreview, endAnimatePreview, attemptExercise, editingGameInput } from '../../actions'
import { FV_TS } from '../../selectors'
import { getPhase1Ready, getExerciseComplete } from '../../selectors/evaluations'
import PrimerPreviewSmall from './PrimerPreviewSmall'
import { ConcavedInput } from '../../components/Input'
import { Left5, Right3 } from '../../components/HelperEnds'
import { P } from '../../components/Text'
import { SecondaryButton } from '../../components/Button'

const Input = ConcavedInput.extend`
  box-sizing: border-box;
  font-family: monospace;
`

const RoundLeftInput = Input.extend`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 120px;
  margin-right: 3px;
`
const RoundRightInput = Input.extend`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 1;
`

const FormContainer = styled.form`
  padding: ${p => p.theme.sidebarPadding};
  > * {
    margin-bottom: ${p => p.theme.sidebarPadding};
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span { /* helper ends */
    text-align: center;
    z-index: 20;
    top: -0.7rem;
  }
  > span:first-child {
    left: 5px;
  }
  > span:last-child {
    right: 5px;
  }

`

export class Form extends Component {
  handleChange = (e) => {
    this.props.updateInput(e.target.name, e.target.value)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.attemptExercise()
  }
  handleFGFocus = () => this.props.editingGameInput('FG', true)
  handleRGFocus = () => this.props.editingGameInput('RG', true)
  handleFGBlur = () => this.props.editingGameInput('FG', false)
  handleRGBlur = () => this.props.editingGameInput('RG', false)

  animatePreviewButton = () => {
    const { beginAnimatePreview, endAnimatePreview, animatingPreview } = this.props
    if(!animatingPreview) {
      return <button
        type="button" onClick={beginAnimatePreview}
        className="btn btn-info btn-small">Preview reverse primer</button>
    } else {
      return <button
        type="button" onClick={endAnimatePreview}
        className="btn btn-info">End reverse primer preview</button>
    }
  }
  submitButton = () => {
    if (this.props.phase1Ready) {
      if (this.props.exerciseComplete) {
        return (
          <button type="submit" className="btn btn-primary mr-3">
            Submit answer!
        </button>
        )
      } else {
        return (
          <button type="submit" className="btn btn-primary mr-3">
            Check final considerations
        </button>
        )
      }
    }
    return (
      <button type="submit" disabled className="btn btn-primary mr-3">
        Not there yet, keep trying!
      </button>
    )
  }
  render() {
    const { FV, FG, RV, RG, FV_TS } = this.props
    return (
      <FormContainer className="form-group primer-form" onSubmit={this.handleSubmit} autoComplete="prevent-autoComplete">
        <Row>
          <P><strong>Forward primer</strong></P>
          <SecondaryButton onClick={() => {}}>Preview</SecondaryButton>
        </Row>
        <PrimerPreviewSmall strand="forward" />
        <Row>
          <Left5 />
          <RoundLeftInput autoComplete="prevent-autoComplete"
            name='FV' value={FV} type="text" 
            onChange={this.handleChange} 
          />
          <RoundRightInput autoComplete="prevent-autoComplete"
            name='FG' value={FG} type="text" 
            onChange={this.handleChange} onFocus={this.handleFGFocus} onBlur={this.handleFGBlur}
          />
          <Right3 />
        </Row>


        <Row>
          <P><strong>Reverse primer</strong></P>
          <SecondaryButton onClick={() => { }}>Preview</SecondaryButton>
        </Row>
        <PrimerPreviewSmall strand="reverse" />
        <Row>
          <Left5 />
          <RoundLeftInput autoComplete="prevent-autoComplete"
              name='RV' value={RV}
              type="text" onChange={this.handleChange} 
            />
            <RoundRightInput autoComplete="prevent-autoComplete"
              name='RG' value={RG}
              type="text" onChange={this.handleChange} onFocus={this.handleRGFocus} onBlur={this.handleRGBlur}
            />
          <Right3 />
        </Row>
        {this.submitButton()}
        {this.animatePreviewButton()}
      </FormContainer>
    )
  }
}

const mapStateToProps = (state) => {
  const { formInputs, animatingPreview } = state
  return {
    phase1Ready: getPhase1Ready(state),
    exerciseComplete: getExerciseComplete(state),
    FV: formInputs.FV,
    FG: formInputs.FG,
    RV: formInputs.RV,
    RG: formInputs.RG,
    animatingPreview,
    FV_TS: FV_TS(state),
  }
}

export default connect(mapStateToProps, { 
  updateInput, 
  beginAnimatePreview, 
  endAnimatePreview,
  attemptExercise,
  editingGameInput,

})(Form)