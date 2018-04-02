import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Link = styled(RouterLink)` 
  display: inline-block;
  background: ${props => props.theme.lightGrey};
  color: #340C4B;
  border-radius: 2px;
  border: 0;
  box-shadow: rgba(0,0,0, 0.2) 0 1px 1px 0;
  font-weight: bold;
  padding: 8px 9px;
  letter-spacing: 0;
  &:hover:not(:disabled) {
    background: ${props => darken(0.1, props.theme.lightGrey)};
    box-shadow: rgba(0,0,0, 0.4) 0 1px 1px 0;
    cursor: pointer;
  }
`

export const HighlightLink = Link.extend`
  background: purple;
  color: white;
  &:hover:not(:disabled) {
    background: ${props => darken(0.1, props.theme.purple)};
  }
`

export const SecondaryLink = Link.extend`
  background: ${p => lighten(0.1, p.theme.lightGrey)};
`