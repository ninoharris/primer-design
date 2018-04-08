import React from 'react'
import { connect } from 'react-redux'
import { darken, lighten } from 'polished'
import styled from 'styled-components'
import { beginAnimatePreview, endAnimatePreview } from '../../actions'

export const Button = styled.button`  
  background: ${p => p.theme.lightGrey};
  color: #340C4B;
  border: 0;
  font-weight: bold;
  padding: 6px 9px;
  letter-spacing: 0;
  opacity: 0.7;
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 1; 
    background: ${p => lighten(0.1, p.theme.lightGrey)};
    box-shadow: rgba(0,0,0, 0.2) 0 1px 1px 0;
  }
`
export const SecondaryButton = Button.extend`
  &:hover:not(:disabled) {
    color: ${p => p.theme.black};
  }
`

const Container = styled.div`
  *:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
  }
  *:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
  }
`

const ReversePrimerPreviewButton = ({ beginAnimatePreview, endAnimatePreview, animatingPreview }) => (
  <Container>
    <SecondaryButton disabled={animatingPreview}
      type="button" onClick={beginAnimatePreview}
      className="btn btn-info btn-small">3' to 5'</SecondaryButton>
    <SecondaryButton
      type="button" disabled={!animatingPreview} onClick={endAnimatePreview}
      className="btn btn-info">5' to 3'</SecondaryButton>
  </Container>
)

const mapStateToProps = ({ animatingPreview }) => ({ animatingPreview })

export default connect(mapStateToProps, {
  beginAnimatePreview, 
  endAnimatePreview,
})(ReversePrimerPreviewButton)