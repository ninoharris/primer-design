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
      title = '',
      additional = '',
      ID = '',
      inputs = []
    } = this.props.message
    this.props.sendAdviceMessage({ title, additional, ID, inputs })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.ID !== this.props.ID) this.setState({ showMessage: false })
  }
  render() {
    const { ID, title, additional, url, inputs = []} = this.props.message
    const { showMessage } = this.state
    const inputsFullName = inputs.map((input) => this.inputs[input])
    return (
      <li
        className={`evaluation-item failure ${showMessage ? '' : 'blur-message'}`}
        onClick={this.showMessage}
      >
        <div className="actual-error">
          <h6>{title}</h6>
          {url ? <a target="_blank" className="btn btn-outline-light btn-sm mt-2" href={`/tutorials${url}`}>See related tutorial </a> : ''}
          {additional ? <p className="additional">{additional}</p> : ''}
        </div>
        {this.state.showMessage ? '' : 
          <div className="error-overlay">
            <h6>Underneath is some advice for inputs {inputsFullName.join(' & ')}</h6>
            <div>Clicking this box will display a correction. Don’t use this too often though as every peek advice is saved!</div>
          </div>
        }
      </li>
    )
  }
}
FailureMessage.propTypes = {
  message: PropTypes.shape({
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