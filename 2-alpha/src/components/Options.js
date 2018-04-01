import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toggle from './Toggle'
import { showCodons, showAdminEvaluation } from '../selectors'
import { doShowCodons, doShowAdminEvaluation } from '../actions'

class Options extends Component {
  render() {
    const { showCodons, doShowCodons, showAdminEvaluation, doShowAdminEvaluation } = this.props
    return (
      <div>
        <Toggle on={showCodons} onToggle={on => doShowCodons(on)} className="mb-2">
          <Toggle.On>Showing codons</Toggle.On>
          <Toggle.Off>Hiding codons</Toggle.Off>
          <Toggle.Button />
        </Toggle>
        <Toggle on={showAdminEvaluation} onToggle={on => doShowAdminEvaluation(on)} className="mb-2">
          <Toggle.On>Showing evaluation objects</Toggle.On>
          <Toggle.Off>Hiding evaluation objects</Toggle.Off>
          <Toggle.Button />
        </Toggle>
      </div>
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