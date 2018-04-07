import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { showCodons, showAdminEvaluation } from '../selectors'
import { doShowCodons, doShowAdminEvaluation } from '../actions'

import Toggle from './Toggle'
import { PLight } from './Text'

const Container = styled.div`
  > * {
    margin-bottom: 0.4rem;
  }
  font-size: 0.8rem;
  color: ${p => p.theme.textDefault};
`

class Options extends Component {
  render() {
    const { showCodons, doShowCodons, showAdminEvaluation, doShowAdminEvaluation } = this.props
    return (
      <Container>
        <Toggle on={showCodons} onToggle={on => doShowCodons(on)} className="mb-2">
          <Toggle.Button />
          <Toggle.On>Showing codons</Toggle.On>
          <Toggle.Off>Hiding codons</Toggle.Off>
        </Toggle>
        <Toggle on={showAdminEvaluation} onToggle={on => doShowAdminEvaluation(on)} className="mb-2">
          <Toggle.Button />
          <Toggle.On>Showing evaluation objects</Toggle.On>
          <Toggle.Off>Hiding evaluation objects</Toggle.Off>
        </Toggle>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showCodons: showCodons(state),
    showAdminEvaluation: showAdminEvaluation(state),
  }
}

export default connect(mapStateToProps, { doShowCodons, doShowAdminEvaluation })(Options)