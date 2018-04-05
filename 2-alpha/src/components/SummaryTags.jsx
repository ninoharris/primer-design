import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { desaturate, lighten } from 'polished'

import { P as PBasic} from './Text'
import { RaisedBox } from './Container'

const Circle = styled.div`
  font-weight: bold;
  text-align: center;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.grey};
  border-radius: 100%;
`
export const CircleIcon = ({ val }) => <Circle><span>{val}</span></Circle>

const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2rem;
  > div {
    margin-left: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  > * {
    line-height: 1; /* Minimal spacing between text and linkText */
  }
`
let P = PBasic.extend`
  margin: 0;
  line-height: 1;
`
let Link = styled(RouterLink)`
  color: ${p => desaturate(0.2, p.theme.purple)};
`

export const SummaryWithLink = ({ val, text, linkText = 'view', url = '/admin'}) => (
  <SummaryContainer>
    <CircleIcon val={val} />
    <div>
      <P><strong>{text}</strong></P>
      <Link to={url}>{linkText}</Link>
    </div>
  </SummaryContainer>
)

export const Summary = ({ val, text }) => (
  <SummaryContainer>
    <CircleIcon val={val} />
    <div>
      <P><strong>{text}</strong></P>
    </div>
  </SummaryContainer>
)

const CommonMistakeContainer = RaisedBox.extend`
  padding: 0.1rem 0.4rem;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  margin-right: 0.6rem;
  margin-bottom: 0.4rem;
  color: ${p => p.theme.textDefault};
  background: ${p => lighten(0.04, p.theme.grey)};
  > span {
    border-radius: 100%;
    height: 1.4rem;
    width: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    margin-right: 0.4rem;
    background: ${p => p.theme.grey};
    color: ${p => p.theme.black};
    font-size: 0.8rem;
  }
`
export const CommonMistake = ({ val, text }) => (
  <CommonMistakeContainer>
    <span>{val}</span>{text}
  </CommonMistakeContainer>
)