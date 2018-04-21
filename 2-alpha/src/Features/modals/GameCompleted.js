import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import { updateCurrentStudentID } from '../../actions'

import { HighlightButton } from '../../components/Button'
import { Title } from '../../components/Text'

class Success extends Component {
  state = {
    hoverNote: ''
  }
  render() {
    if (!this.props.isOpen) return null
    return (
      <Modal isOpen={this.props.isOpen}>
        <div className="Success-Modal">
          <Title>Congratulations, you have completed all of your exercises!</Title>
          <HighlightButton onClick={() => this.props.updateCurrentStudentID(null)}>Click here to log out.</HighlightButton>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.gameCompleted
})

export default connect(mapStateToProps, { updateCurrentStudentID })(Success)