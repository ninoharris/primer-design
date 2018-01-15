import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { newExercise } from '../../actions/index'

const Success = (props) => (
  <Modal
    isOpen={props.isOpen}
  >
    <div className="success-modal">
      <h2>Success!</h2>
      <div>
        Here will be the final construct.
      </div>
      <button onClick={props.newExercise}>Start new exercise!</button>
    </div>
  </Modal>
)

const mapStateToProps = (state) => {
  return {
    isOpen: state.success
  }
}

export default connect(mapStateToProps, { newExercise })(Success)