import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { newExercise } from '../../actions/index'

import FinalClone from '../Display/FinalClone'

class Success extends Component {
  state = {
    hoverNote: ''
  }
  handleMouseEnter = (hoverNote) => {
    this.setState({ hoverNote })
  }
  render() {
    if(!this.props.isOpen) return null
    return (
      <Modal isOpen={this.props.isOpen} >
        <div className="success-modal">
          <h2>Success!</h2>
          <strong>Hover any section to see its purpose</strong>
          <h4>Here will be the final construct:</h4>
          <div className="Final-hover-note">{this.state.hoverNote}</div>
          <FinalClone handleMouseEnter={this.handleMouseEnter} />
          <button className="btn btn-success" onClick={this.props.newExercise}>Start new exercise!</button>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.success 
})

export default connect(mapStateToProps, { newExercise })(Success)