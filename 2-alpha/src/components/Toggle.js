import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ToggleOn = ({ on, children }) => {
  return <div className="toggle-on">{ on ? children : null }</div>
}
const ToggleOff = ({ on, children }) => {
  return <div className="toggle-off">{ on ? null : children }</div>
}
const ToggleButton = ({ on, toggle, ...props }) => {
  return <Switch on={on} onClick={toggle} {...props} />
}

class Toggle extends Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton
  static defaultProps = { toggle: () => {} }
  state = {
    on: false,
  }
  toggle = () => 
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  render() {
    const children = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      })
    )
    return (
      <div>
        {children}
      </div>
    )
  }
}
Toggle.propTypes = {
  toggle: PropTypes.func
}

const Switch = ({ on, onClick, ...props }) => (
  <div className="toggle">
    <input type="checkbox" className="toggle-input" />
    <button className={`toggle-btn ${on ? "toggle-btn-on" : "toggle-btn-off"} `}
      onClick={onClick} 
      aria-expanded={on}
      {...props} />
  </div>
)

export default Toggle;