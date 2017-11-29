import React, { Component } from 'react'

export default class InputForm extends Component {
  onSubmit = (e) => {
    e.preventDefault()
  }
  onChange = (e) => {
    const { name, value } = e.target
    if(isNaN(value)) return this.props.onChange(name, null)
    this.props.onChange(name, value)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="startPos">Start position</label>
        <input type="text" id="startPos" name="startPos" onChange={this.onChange} />
        <br/>
        <label htmlFor="endPos">End position</label>
        <input type="text" id="endPos" name="endPos" onChange={this.onChange} />
      </form>
    )
    
  }
}