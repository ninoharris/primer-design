import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { PLight } from '../components/Text'
import { RaisedBox } from './Container'

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

export const SearchContainer = RaisedBox.extend`
  width: 100%;
  display: flex;
  background: ${p => p.theme.lightGrey};
  > * {
    padding: 0.7rem;
  }

  input {
    flex: 1;
    background: ${p => p.theme.white};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 0;
    color: ${p => p.theme.black};
  }
`

export const SearchOption = styled.div`
  display: flex;
  align-items: center;
`

export const LabelText = PLight.extend`
  margin-bottom: 0;
`