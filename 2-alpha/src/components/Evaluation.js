import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVectorEvaluations } from '../selectors'

class Evaluation extends Component {
  render() {
    if(this.props.loading) return null
    return (
      <ul className="list-group">
        {this.props.messages.map(msg => {
          const className = 'list-group-item ' + (msg.success ? 'list-group-item-success' : 'list-group-item-danger')
          return (
            <li className={className} key={msg.message}>
              {msg.message}
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
    messages: getVectorEvaluations(state)
  }
}

export default connect(mapStateToProps)(Evaluation)