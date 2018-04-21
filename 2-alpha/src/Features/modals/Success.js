import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { nextExercise } from '../../actions/index'

import { HighlightButton } from '../../components/Button'
import { Title } from '../../components/Text'
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
      <Modal isOpen={this.props.isOpen}>
        <div className="Success-Modal">
          <Title>Success, you have completed the exercise!</Title>
          <div className="Final-Hover-Note"><strong>Hover any section to see its purpose</strong>: {this.state.hoverNote}</div>
          <h3>Here will be the final construct:</h3>
          {/* <FinalClone handleMouseEnter={this.handleMouseEnter} /> */}
          <HighlightButton onClick={this.props.nextExercise}>Start new exercise!</HighlightButton>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.displayCompletedExercise
})

export default connect(mapStateToProps, { nextExercise })(Success)