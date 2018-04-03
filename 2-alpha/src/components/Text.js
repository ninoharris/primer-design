import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const P = styled.p`
  color: ${p => p.theme.textDefault}
  line-height: ${p => p.theme.pLineHeight};
  margin-bottom: ${p => p.theme.pMarginBottom};
  font-weight: bold;
`
export const PLight = P.extend`
  color: ${p => lighten(0.2, p.theme.textDefault)}
`