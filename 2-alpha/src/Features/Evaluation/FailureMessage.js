import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { messageIDsToDetails } from '../../selectors/messages'

export class FailureMessage extends Component {
  state = { showMessage: false }
  inputs = {
    'FV': 'forward primer (vector part)',
    'FG': 'forward primer (haystack part)',
    'RV': 'reverse vector (vector part)',
    'RG': 'reverse gene (haystack part)',
  }
  showMessage = () => {
    this.setState({ showMessage: true })
  }
  render() {
    const { ID, context, inputs } = this.props
    const details = messageIDsToDetails[ID](context)
    const style = this.state.showMessage ? {} : { filter: 'blur(6px)' }
    const inputsFullName = inputs.map((input) => this.inputs[input])
    return (
      <li
        className='evaluation-item failure'
        onClick={this.showMessage}
      >
        <div style={style}>
          <strong>{details.title}</strong>
          {details.additional ? <small className="additional"><hr />{details.additional}</small> : ''}
          {details.url ? <a target="_blank" className="btn btn-outline-light btn-sm mt-2" href={`/tutorials${details.url}`}>See related tutorial </a> : ''}
        </div>
        {this.state.showMessage ? '' : 
          <div className="error-overlay">
            <strong>Error in {inputsFullName.join(' & ')}.</strong>
            <div>Click this message to view the error.</div>
          </div>
        }
      </li>
    )
  }
}
FailureMessage.propTypes = {
  context: PropTypes.any,
  inputs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ID: PropTypes.string.isRequired,
}

export default FailureMessage