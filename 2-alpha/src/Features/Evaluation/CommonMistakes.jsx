import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getUserCommonMistakes } from '../../selectors/evaluations'

import { PNoMargins } from '../../components/Text'
import { CommonMistake } from '../../components/SummaryTags'

const Container = styled.div`
`

const CommonMistakes = ({ commonMistakes, limit = 5}) => (
  <Container>
    <PNoMargins><strong>Your most common mistakes</strong></PNoMargins>
    {commonMistakes.slice(0, 5).map(mistake => {
      const adminText = mistake[0], count = mistake[1], attemptID = mistake[2]
      return <CommonMistake key={attemptID} val={count} text={adminText} />
    })}
  </Container>
)

const mapStateToProps = (state) => ({
  commonMistakes: getUserCommonMistakes(state)
})

export default connect(mapStateToProps)(CommonMistakes)