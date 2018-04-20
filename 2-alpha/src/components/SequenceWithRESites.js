import _ from 'lodash'
import React from 'react'
import * as api from '../api'

import { lighten } from 'polished';
import styled from 'styled-components';

const Container = styled.span`
  .re-site-tl::after, .re-site-bl::after {
    top: -1px;
    content: '';
    border-right: 1px dashed rgba(0,0,0,1);
    position: absolute;
    height: 100%;
  }
`

const SequenceWithRESites = ({ RESites = [], sequence = '', sequenceDirection }) => {
  console.log('sequence with RE sites:', RESites)
  let lastIndex = 0, output = [] 
  
  // Only show valid helpers, sort by pos, and map to an array to be iterated over
  RESites
    .filter(RESite => RESite.pos && RESite.len)
    .sort((a, b) => a.pos - b.pos)
    .forEach(({ pos, name, len, color, cutsForward, cutsReverse }) => {
    if (pos > lastIndex) {
      output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex, pos)}</span>)
    }
    const text = sequence.substr(pos, len)
    if(sequenceDirection === 'forward') {
      output.push(
        <span key={`${pos}-tl`} className={`re-site-tl  ${name}`} style={{backgroundColor: color}}>{text.slice(0, cutsForward)}</span>,
        <span key={`${pos}-tr`} className={`re-site-tr  ${name}`} style={{ backgroundColor: lighten(0.15, color) }}>{text.slice(cutsForward)}</span>,

      )
    } else {
      output.push(
        <span key={`${pos}-tl`} className={`re-site-bl  ${name}`} style={{ backgroundColor: lighten(0.15, color) }}>{text.slice(0, cutsReverse)}</span>,
        <span key={`${pos}-tr`} className={`re-site-br  ${name}`} style={{ backgroundColor: color }}>{text.slice(cutsReverse)}</span>,
      )
    }
    
    lastIndex = len + pos
  })
  if (lastIndex < sequence.length) { // we're not done yet...
    output.push(<span key={lastIndex} className="in-between">{sequence.slice(lastIndex)}</span>)
  }
  return (<Container className="Highlighted-Sequence sequence">{output}</Container>)
}

export default SequenceWithRESites