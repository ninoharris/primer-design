import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Button = styled.button`  
  background: ${props => props.theme.lightGrey};
  color: #340C4B;
  border-radius: 2px;
  border: 0;
  box-shadow: rgba(0,0,0, 0.2) 0 1px 1px 0;
  font-weight: bold;
  padding: 6px 9px;
  letter-spacing: 0;
  &:hover:not(:disabled) {
    background: ${props => darken(0.1, props.theme.lightGrey)};
    box-shadow: rgba(0,0,0, 0.4) 0 1px 1px 0;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.4; 
    cursor: not-allowed;
  }
`


export const HighlightButton = Button.extend`
  background: purple;
  color: white;
  &:hover:not(:disabled) {
    background: ${props => darken(0.1, props.theme.purple)};
  }
`