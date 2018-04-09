import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';

import { RaisedBox } from './Container';

export const CheckboxContainer = RaisedBox.extend`
  display: flex;
  padding: 0.3rem 0.7rem;
  align-items: center;
  background: ${p => lighten(0.03, p.theme.grey)};
  cursor: pointer;
  input {
    margin-right: 0.3rem;
  }
  :hover {
    color: ${p => p.theme.white};
    background: ${p => p.theme.grey};
  }
`
let Label = styled.label`
  color: ${p => p.theme.black};
  margin: 0;
  cursor: pointer;
`


export const Checkbox = ({ value, name, label, onChange, ...rest}) => {
  let checked
  return (
    <CheckboxContainer onClick={() => onChange(!value)}>
      <input type="checkbox" onChange={(e) => onChange(!value)} checked={value} {...rest} id={name} />
      <Label onClick={() => onChange(!value)}>{label}</Label>
    </CheckboxContainer>
  )
}
  

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}