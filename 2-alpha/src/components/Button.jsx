import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Button = styled.button`  
  background: ${p => p.theme.lightGrey};
  color: #340C4B;
  border-radius: 4px;
  border: 0;
  box-shadow: rgba(0,0,0, 0.2) 0 1px 1px 0;
  font-weight: bold;
  padding: 6px 9px;
  letter-spacing: 0;
  &:hover:not(:disabled) {
    background: ${p => darken(0.1, p.theme.lightGrey)};
    box-shadow: rgba(0,0,0, 0.4) 0 1px 1px 0;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.4; 
    cursor: not-allowed;
  }
`


export const HighlightButton = Button.extend`
  background: ${p => p.theme.purple};
  color: white;
  &:hover:not(:disabled) {
    background: ${p => darken(0.1, p.theme.purple)};
  }
`

export const SecondaryButton = Button.extend`
  background: ${p => lighten(0.1, p.theme.lightGrey)};
  &:hover {
    background: ${props => props.theme.lightGrey};
  }
`

export const CTAButton = Button.extend`
  background: ${p => p.theme.red};
  color: ${p => p.theme.white};
  &:hover:not(:disabled) {
    background: ${p => darken(0.05, p.theme.red)};
    box-shadow: rgba(0,0,0, 0.3) 0 1px 1px 0;

  }
`