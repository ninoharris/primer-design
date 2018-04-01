import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { currentExerciseID, getCurrentStudentID } from '../../selectors'
import { sendAdviceMessage as sendAdviceMessageAction } from '../../actions'

export class FailureMessage extends Component {
  state = { showMessage: false }
  inputs = {
    'FV': 'forward primer (vector/additional): top left input',
    'FG': 'forward primer (SOI annealing): top right input',
    'RV': 'reverse vector (vector/additional): bottom left input',
    'RG': 'reverse gene (SOI annealing): bottom right input',
  }
  showMessage = () => {
    this.setState({ showMessage: true })
    const {
      title,
      additional,
      ID,
    } = this.props.message
    this.props.sendAdviceMessage({ title, additional, ID })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.ID !== this.props.ID) this.setState({ showMessage: false })
  }
  render() {
    const { ID, title, additional, url, inputs = []} = this.props.message
    console.log('message', this.props.message)
    const { showMessage } = this.state
    const inputsFullName = inputs.map((input) => this.inputs[input])
    return (
      <li
        className={`evaluation-item failure ${showMessage ? '' : 'blur-message'}`}
        onClick={this.showMessage}
      >
        <div className="actual-error">
          <strong>{title}</strong>
          {additional ? <small className="additional"><hr />{additional}</small> : ''}
          {url ? <a target="_blank" className="btn btn-outline-light btn-sm mt-2" href={`/tutorials${url}`}>See related tutorial </a> : ''}
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
  message: PropTypes.objectOf({
    context: PropTypes.any,
    inputs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    ID: PropTypes.string.isRequired,
  })
}


const sendAdviceMessage = (message) => (dispatch, getState) => {
  const exerciseID = currentExerciseID(getState())
  const studentID = getCurrentStudentID(getState())
  dispatch(sendAdviceMessageAction(studentID, exerciseID)(message))
}


export default connect(null, {
  sendAdviceMessage
})(FailureMessage)