import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from '../../configureStore'

class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div')
    this.modalTarget.className = 'pd-modal'
    document.body.appendChild(this.modalTarget)
    console.log(this.modalTarget)
    this._render()
  }
  componentWillUpdate() {
    this._render()
  }
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget)
    document.body.removeChild(this.modalTarget)
  }
  render() {
    return <noscript />
  }
  _render() {
    // ReactDOM.render(<Provider store={this})
    ReactDOM.render(
      <Provider store={configureStore}>
        <div className="modal-content">
          {this.props.children}
        </div>
      </Provider>, 
      this.modalTarget)
  }
}



export default Modal