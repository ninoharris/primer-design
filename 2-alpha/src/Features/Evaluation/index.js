import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllEvaluations } from '../../selectors'
import { messageIDsToDetails } from '../../selectors/messages'

class Evaluation extends Component {
  displayMessage = (msg) => {
    const details = messageIDsToDetails[msg.ID](msg.context)
    const className = 'list-group-item ' + (msg.success ? 'list-group-item-success' : 'list-group-item-danger')
    return (
      <li className={className} key={msg.ID}>
        <strong>{msg.inputs.join(' & ')}: </strong>{details.title}
        {details.additional ? <small className="additional"><hr />{details.additional}</small> : ''}
      </li>
    )
  }
  render() {
    // console.log(this.props.messageIDsList)
    if(this.props.loading) return null
    const allMessages = this.props.messageIDsList
    
    const successMessages = allMessages.filter(msg => msg.success)
    const failureMessage = allMessages.find(msg => !msg.success)
    return (
      <ul className="list-group">
        {successMessages.map((msg) => this.displayMessage(msg))}
        {failureMessage ? this.displayMessage(failureMessage) : ''}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  if(state.loading) return { loading: true }
  return {
    messageIDsList: getAllEvaluations(state)
  }
}

export default connect(mapStateToProps)(Evaluation)