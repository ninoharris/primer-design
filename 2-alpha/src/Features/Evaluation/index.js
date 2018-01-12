import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllEvaluations } from '../../selectors'
import { messageIDsToDetails } from '../../selectors/messages'

class Evaluation extends Component {
  render() {
    // console.log(this.props.messageIDsList)
    if(this.props.loading) return null
    return (
      <ul className="list-group">
        {this.props.messageIDsList.map((msg) => {
          const details = messageIDsToDetails[msg.ID](msg.context)
          const className = 'list-group-item ' + (msg.success ? 'list-group-item-success' : 'list-group-item-danger')
          return (
            <li className={className} key={msg.ID}>
              <strong>{msg.inputs.join(' & ')}: </strong>{details.title}
              {details.additional ? <small className="additional"><hr/>{details.additional}</small> : ''}
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
    messageIDsList: getAllEvaluations(state)
  }
}

export default connect(mapStateToProps)(Evaluation)