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
    on: this.props.on === null ? false : this.props.on,
  }
  toggle = () => 
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  render() {
    const { on } = this.state
    const children = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        on,
        toggle: this.toggle
      })
    )
    return (
      <div className={`toggle-wrapper toggle-is-${on ? 'on':'off'}`}>
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