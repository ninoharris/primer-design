import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEditingGameInputs } from '../../selectors'

const Container = styled.div`
  font-family: ${p => p.theme.sequenceFont};
  line-height: 1rem;
  color: ${p => p.theme.textDefault};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    margin-bottom: 0;
  }
`

const InputHint = ({ currentInput = null }) => {
  let hintText
  if (currentInput === 'FV') {
    hintText = `This input should contain a 5’ cap, the forward restriction site sequence, and bases added to achieve correct ORF.`
  }
  if (currentInput === 'FG') {
    hintText = `This input should contain the hybridisation sequence to the start of the sequence of interest.`
  }
  if (currentInput === 'RV') {
    hintText = `This input should contain a 5’ cap, the reverse restriction site sequence, and bases added to achieve correct ORF.`
  }
  if (currentInput === 'RG') {
    hintText = `This input should contain the hybridisation sequence to the end of the sequence of interest.`
  }
  return (
    <Container>
      <p>{hintText}</p>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  currentInput: getEditingGameInputs(state),
})

export default connect(mapStateToProps)(InputHint)