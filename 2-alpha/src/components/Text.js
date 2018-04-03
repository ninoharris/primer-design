import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100vh;
`

export const P = styled.p`
  color: ${p => p.theme.textDefault}
  line-height: ${p => p.theme.pLineHeight};
  margin-bottom: ${p => p.theme.pMarginBottom};
  font-weight: bold;
`
export const PLight = P.extend`
  color: ${p => lighten(0.2, p.theme.textDefault)};
`

export const Title = styled.div`
 font: 24px/29px ${p => p.theme.fontStack};
 font-weight: 600;
`

export const BigTitle = Title.extend`
  font-size: 40px/48px;
  margin-bottom: 35px;
`