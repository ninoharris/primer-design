import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ConcavedInput } from './Input'
import { HighlightButton } from './Button';
import { FlexVerticallyCenter } from './Container'

const Form = FlexVerticallyCenter.withComponent('form').extend`
  padding: 0.8rem 1rem;
  input {
    flex: 1;
  }
`

export class SimpleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }
  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.props.children}
        <ConcavedInput value={this.state.text} onChange={this.handleChange} />
        <HighlightButton type="submit">{this.props.submitText}</HighlightButton>
      </Form>
    )
  }
}
SimpleForm.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
}


export default SimpleForm