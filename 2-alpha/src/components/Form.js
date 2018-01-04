import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInput, beginAnimatePreview } from '../actions'

import PrimerPreviewSmall from './PrimerPreviewSmall'

class Form extends Component {
  handleChange = (e) => {
    this.props.updateInput(e.target.name, e.target.value)
  }
  handleSubmit = (e) => {
    e.preventDefault()
  }
  renderInput = (segment, value, label) => {
    return (
      <div className="col-6">
        <label htmlFor={'form-'+segment}>{label}</label>
        <input
          name={segment} id={'form-'+segment} value={value}
          type="text" onChange={this.handleChange}
          className="form-control mb-3" />
      </div>
    )
  }
  render() {
    const { FV, FG, RV, RG, animatingPreview, beginAnimatePreview } = this.props
    return (
      <form className="form-group primer-form" onSubmit={this.handleSubmit}>

        <div className="row">
          {this.renderInput('FV', FV, 'Forward for plasmid')}
          {this.renderInput('FG', FG, 'Forward for gene')}
        </div>
        <div className="row">
          <strong>Forward primer: </strong>
          <PrimerPreviewSmall strand="forward" />
        </div>

        <div className="row">
          {this.renderInput('RV', RV, 'Reverse for plasmid')}
          {this.renderInput('RG', RG, 'Reverse for gene')}
        </div>
        <div className="row">
          <strong>Reverse primer: </strong>
          <PrimerPreviewSmall strand="reverse" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button" onClick={beginAnimatePreview} disabled={animatingPreview}
          className="btn btn-info">Preview primers</button>
      </form>
    )
  }
}

const mapStateToProps = ({formInputs, animatingPreview}) => ({
  FV: formInputs.FV,
  FG: formInputs.FG,
  RV: formInputs.RV,
  RG: formInputs.RG,
  animatingPreview
})

export default connect(mapStateToProps, { updateInput, beginAnimatePreview })(Form)