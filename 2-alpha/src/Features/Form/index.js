import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateInput, attemptExercise, editingGameInput } from '../../actions'
import PrimerPreviewSmall from './PrimerPreviewSmall'
import { ConcavedInput } from '../../components/Input'
import { Left5, Right3 } from '../../components/HelperEnds'
import { P } from '../../components/Text'
import ReversePrimerPreviewButton from './ReversePrimerPreviewButton'

const FormContainer = styled.form`
  padding: ${p => p.theme.sidebarPadding};
  > * {
    margin-bottom: ${p => p.theme.sidebarPadding};
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span { /* helper ends */
    text-align: center;
    z-index: 20;
    top: -0.7rem;
  }
  > span:first-child {
    left: 5px;
  }
  > span:last-child {
    right: 5px;
  }
`

const Input = ConcavedInput.extend`
  box-sizing: border-box;
  font-family: monospace;
`

const RoundLeftInput = Input.extend`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 120px;
  margin-right: 3px;
  font-weight: bold; /* FV and RV (both left) are always displayed bold to differentiate with RG and FG */
`
const RoundRightInput = Input.extend`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 1;
`


export class Form extends Component {
  handleChange = (e) => {
    this.props.updateInput(e.target.name, e.target.value)
  }
  handleSubmit = (e) => {
    e.preventDefault()
  }
  handleFGFocus = () => this.props.editingGameInput('FG', true)
  handleRGFocus = () => this.props.editingGameInput('RG', true)
  handleFGBlur = () => this.props.editingGameInput('FG', false)
  handleRGBlur = () => this.props.editingGameInput('RG', false)


  render() {
    const { FV, FG, RV, RG } = this.props
    return (
      <FormContainer className="form-group primer-form" onSubmit={this.handleSubmit} autoComplete="prevent-autoComplete">
        <Row>
          <P><strong>Forward primer</strong></P>
        </Row>
        <PrimerPreviewSmall strand="forward" />
        <Row>
          <Left5 />
          <RoundLeftInput autoComplete="prevent-autoComplete"
            name='FV' value={FV} type="text" 
            onChange={this.handleChange} 
          />
          <RoundRightInput autoComplete="prevent-autoComplete"
            name='FG' value={FG} type="text" 
            onChange={this.handleChange} onFocus={this.handleFGFocus} onBlur={this.handleFGBlur}
          />
          <Right3 />
        </Row>
        <Row>
          <P><strong>Reverse primer</strong></P>
          <ReversePrimerPreviewButton />
        </Row>
        <PrimerPreviewSmall strand="reverse" />
        <Row>
          <Left5 />
          <RoundLeftInput autoComplete="prevent-autoComplete"
              name='RV' value={RV}
              type="text" onChange={this.handleChange} 
            />
            <RoundRightInput autoComplete="prevent-autoComplete"
              name='RG' value={RG}
              type="text" onChange={this.handleChange} onFocus={this.handleRGFocus} onBlur={this.handleRGBlur}
            />
          <Right3 />
        </Row>
      </FormContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    FV: state.formInputs.FV,
    FG: state.formInputs.FG,
    RV: state.formInputs.RV,
    RG: state.formInputs.RG,
  }
}

export default connect(mapStateToProps, { 
  updateInput, 
  attemptExercise,
  editingGameInput,

})(Form)