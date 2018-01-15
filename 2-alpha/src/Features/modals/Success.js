import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

const Success = ({
  isOpen
}) => (
  <Modal
    isOpen={isOpen}
  >
    <div className="success-modal">
      <h2>Success!</h2>
    </div>
  </Modal>
)

const mapStateToProps = (state) => {
  return {
    isOpen: false
  }
}

export default connect(mapStateToProps)(Success)