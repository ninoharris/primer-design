import React from 'react'
import styled from 'styled-components'

const HangingEnd = styled.span`
  position: relative;
  z-index: -9;
  font-family: monospace;
  color: ${p => p.theme.textDefault};
  letter-spacing: -3px;
  opacity: 0.7;
  > span {
    position: absolute;
    min-width: 25px;
  }
`

const HangingOffLeft = HangingEnd.extend`
  right: 2px; /* for "   5'-   ", the dash is a bit long, so adding some space*/
  text-align: right;
`
const HangingOffRight = HangingEnd.extend`
  left: -1px;
`

export function Left5 () {
  return <HangingEnd><HangingOffLeft>5'-</HangingOffLeft></HangingEnd>
}  

export function Left3 () {
  return <HangingEnd><HangingOffLeft>3'-</HangingOffLeft></HangingEnd>
}  

export function Right5 () {
  return <HangingEnd><HangingOffRight>-5'</HangingOffRight></HangingEnd>
}  

export function Right3 () {
  return <HangingEnd><HangingOffRight>-3'</HangingOffRight></HangingEnd>
}  
