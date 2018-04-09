import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const PNoMargins = styled.p`
  color: ${p => p.theme.textDefault}
  line-height: ${p => p.theme.pLineHeight};
  margin: 0;
`

export const P = PNoMargins.extend`
  margin-bottom: ${p => p.theme.pMarginBottom};
`

export const PLight = P.extend`
  color: ${p => lighten(0.2, p.theme.textDefault)};
`

export const TitleNoMargins = styled.div`
 font: 24px/29px ${p => p.theme.fontStack};
 font-weight: 600;
`

export const Title = TitleNoMargins.extend`
  margin-bottom: 0.6rem;
`

export const BigTitle = Title.extend`
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 35px;
`