import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Input = styled.input`
  background: #FFFFFF;
  padding: 6px 10px;
  border: 0;
  color: ${p => p.theme.darkerGrey};
  &::placeholder {
    color: ${p => lighten(0.2, p.theme.darkerGrey)}
  }
`

export const ConcavedInput = Input.extend`
  box-shadow: inset rgba(0,0,0,0.12) 0 1px 3px 0;
  border-radius: 4px;
`