import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { nextExercise } from '../../actions/index'

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
        <div className="Success-Modal">
          <h2>Success!</h2>
          <div className="Final-Hover-Note"><strong>Hover any section to see its purpose</strong>: {this.state.hoverNote}</div>
          <h3>Here will be the final construct:</h3>
          {/* <FinalClone handleMouseEnter={this.handleMouseEnter} /> */}
          <button className="btn btn-success" onClick={this.props.nextExercise}>Start new exercise!</button>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.displayCompletedExercise
})

export default connect(mapStateToProps, { nextExercise })(Success)