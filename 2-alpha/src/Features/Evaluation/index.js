import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllEvaluations } from '../../selectors/evaluations'

import { SUCCESS, ERROR, INFO } from '../../selectors/evaluator-messages'

import FailureMessage from './FailureMessage'

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
    const { ID, title, additional, url } = msg
    const className = 'evaluation-item ' + (msg.type ===  SUCCESS ? 'success' : 'info')
    return (
      <li
        className={className}
        key={ID}
        // onMouseEnter={() => this.doActions(details.actions)}
        // onMouseLeave={() => this.doActions(details.actions)}
        // style={{ transitionDelay: `${100 * (5-i)}ms`}}
        >
        {/* <strong>{msg.inputs.join(' & ')}: </strong> */}
        <strong>{title}</strong><br/>
        {additional ? <small className="additional"><hr />{additional}</small> : ''}
        {url ? <a target="_blank" className="btn btn-outline-light btn-sm mt-2" href={`/tutorials${url}`}>See related tutorial </a> : ''}
      </li>
    )
  }
  render() {
    // const allMessages = this.props.messageIDsList.getMessages()
    // if(!allMessages) return null
    const { advice } = this.props
    const allMessages = advice.getMessages()
    if(!allMessages) return null
    
    // how many messages are displayed for each is arbitrary and can be changed without errors
    const successMessages = advice.getSuccessMessages().reverse().slice(0, 3)
    const errorMessage = advice.getErrorMessages()[0] // get first one
    const infoMessages = advice.getInfoMessages().slice(0, 2)
    // console.dir(failureMessage)
    return (
      <ul className="evaluation-list">
        {errorMessage ? <FailureMessage message={errorMessage} />: ''}
        {infoMessages.map((msg, i) => this.displayMessage(msg, i + 1))}
        {successMessages.map((msg, i) => this.displayMessage(msg, i+1))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  advice: getAllEvaluations(state)
})
  

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Evaluation)