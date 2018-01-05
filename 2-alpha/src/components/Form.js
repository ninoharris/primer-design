import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInput, beginAnimatePreview, endAnimatePreview } from '../actions'

import PrimerPreviewSmall from './PrimerPreviewSmall'

class Form extends Component {
  handleChange = (e) => {
    // const text = e.target.value.toUpperCase()
    // const filteredText = text.replace(/[^ATGC ]/gi,'')
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
  renderInput2 = () => {

  }
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
  render() {
    const { FV, FG, RV, RG } = this.props
    return (
      <form className="form-group primer-form" onSubmit={this.handleSubmit}>
        <div className="text-center"><strong>Forward Primer</strong></div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">5'</div>
          </div>
          <input className="form-control"
            name='FV' value={FV}
            type="text" onChange={this.handleChange}
          />
          <input className="form-control"
            name='FG' value={FG}
            type="text" onChange={this.handleChange}
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
          <input className="form-control"
            name='RV' value={RV}
            type="text" onChange={this.handleChange}
          />
          <input className="form-control"
            name='RG' value={RG}
            type="text" onChange={this.handleChange}
          />
          <div className="input-group-append">
            <div className="input-group-text">3'</div>
          </div>
        </div>
        <PrimerPreviewSmall strand="reverse" />





        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {this.animatePreviewButton()}
      </form>
    )
  }
}

const mapStateToProps = ({formInputs, animatingPreview}) => ({
  FV: formInputs.FV,
  FG: formInputs.FG,
  RV: formInputs.RV,
  RG: formInputs.RG,
  animatingPreview,
})

export default connect(mapStateToProps, { updateInput, beginAnimatePreview, endAnimatePreview })(Form)