import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getAllEvaluations } from '../../selectors'
import { messageIDsToDetails } from '../../selectors/messages'

// const Fade = ({ children, ...props}) => (
//   <CSSTransition timeout={1000} {...props} classNames={{
//     enter: 'fade',
//     entering: 'fade-enter'
//   }}>
//     {children}
//   </CSSTransition>
// )

class Evaluation extends Component {
  doActions = (actions = []) => {
    actions.forEach(action => this.props.dispatch(action))
  }
  displayMessage = (msg, i) => {
    const details = messageIDsToDetails[msg.ID](msg.context)
    const className = 'evaluation-item ' + (msg.success ? 'success' : 'failure')
    return (
      <li
        className={className}
        key={msg.ID}
        onMouseEnter={() => this.doActions(details.actions)}
        // onMouseLeave={() => this.doActions(details.actions)}
        // style={{ transitionDelay: `${100 * (5-i)}ms`}}
        >
        {/* <strong>{msg.inputs.join(' & ')}: </strong> */}
        <strong>{details.title}</strong>
        {details.additional ? <small className="additional"><hr />{details.additional}</small> : ''}
      </li>
    )
  }
  render() {
    console.log('rerender of evaluation:', this.props.messageIDsList)
    const allMessages = this.props.messageIDsList
    if(!allMessages) return null
    
    const successMessages = allMessages.filter(msg => msg.success)
    const failureMessage = allMessages.find(msg => !msg.success)
    return (
      <ul className="evaluation-list">
        {failureMessage ? this.displayMessage(failureMessage, 0) : ''}
        {successMessages.reverse().slice(0, 3).map((msg, i) => this.displayMessage(msg, i+1))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  messageIDsList: getAllEvaluations(state)
})
  

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)