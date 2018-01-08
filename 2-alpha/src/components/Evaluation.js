import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVectorEvaluations, getHaystackEvaluations } from '../selectors'
import { messageIDsToDetails } from '../selectors/messages'

class Evaluation extends Component {
  render() {
    if(this.props.loading) return null
    return (
      <ul className="list-group">
        {this.props.messageIDsList.map((msg) => {
          const details = messageIDsToDetails[msg.ID]
          if(!details) throw Error('Message ID from evaluation not found! ' + msg.ID)
          const className = 'list-group-item ' + (msg.success ? 'list-group-item-success' : 'list-group-item-danger')
          return (
            <li className={className} key={msg.ID}>
              <strong>{msg.inputs.join(' & ')}: </strong>{details.title}
              <small>{msg.additional}</small>
            </li>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  if(state.loading) return { loading: true }
  return {
    messageIDsList: getVectorEvaluations(state).concat(getHaystackEvaluations(state))
  }
}

export default connect(mapStateToProps)(Evaluation)