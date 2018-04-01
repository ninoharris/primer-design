import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInput, beginAnimatePreview, endAnimatePreview, attemptExercise, editingGameInput } from '../../actions'
import { FV_TS } from '../../selectors'
import { getPhase1Ready, getExerciseComplete } from '../../selectors/evaluations'
import PrimerPreviewSmall from './PrimerPreviewSmall'

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
      <form className="form-group primer-form" onSubmit={this.handleSubmit} autoComplete="prevent-autoComplete">
        <div className="text-center"><strong>Forward Primer</strong></div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">5'</div>
          </div>
          <input className={'form-control FV ' + (FV_TS ? 'glow' : '')} autoComplete="prevent-autoComplete"
            name='FV' value={FV} type="text" 
            onChange={this.handleChange} 
          />
          <input className="form-control FG" autoComplete="prevent-autoComplete"
            name='FG' value={FG} type="text" 
            onChange={this.handleChange} onFocus={this.handleFGFocus} onBlur={this.handleFGBlur}
          />
          <div className="input-group-append">
            <div className="input-group-text">3'</div>
          </div>
        </div>
        <PrimerPreviewSmall strand="forward" />

        <div className="text-center"><strong>Reverse Primer</strong></div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">5'</div>
          </div>
          <input className="form-control RV" autoComplete="prevent-autoComplete"
            name='RV' value={RV}
            type="text" onChange={this.handleChange} 
          />
          <input className="form-control RG" autoComplete="prevent-autoComplete"
            name='RG' value={RG}
            type="text" onChange={this.handleChange} onFocus={this.handleRGFocus} onBlur={this.handleRGBlur}
          />
          <div className="input-group-append">
            <div className="input-group-text">3'</div>
          </div>
        </div>
        <PrimerPreviewSmall strand="reverse" />

        {this.submitButton()}
        {this.animatePreviewButton()}
      </form>
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