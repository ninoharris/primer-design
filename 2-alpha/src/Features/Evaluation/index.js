import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllEvaluations } from '../../selectors'
import { messageIDsToDetails } from '../../selectors/messages'

class Evaluation extends Component {
  doActions = (actions = []) => {
    actions.forEach(action => this.props.dispatch(action))
  }
  displayMessage = (msg) => {
    const details = messageIDsToDetails[msg.ID](msg.context)
    const className = 'list-group-item ' + (msg.success ? 'list-group-item-success' : 'list-group-item-danger')
    return (
      <li className={className} key={msg.ID} onMouseEnter={() => this.doActions(details.actions)}>
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
        {failureMessage ? this.displayMessage(failureMessage) : ''}
        {successMessages.reverse().slice(0, 3).map((msg) => this.displayMessage(msg))}
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

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)