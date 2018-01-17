import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toggle from '../../components/Toggle'
import { showCodons } from '../../selectors'
import { doShowCodons } from '../../actions'

class Options extends Component {
  render() {
    const { showCodons, doShowCodons } = this.props
    return (
      <div>
        <Toggle on={showCodons} onToggle={on => doShowCodons(on)} className="mb-2">
          <Toggle.On>Showing codons</Toggle.On>
          <Toggle.Off>Hiding codons</Toggle.Off>
          <Toggle.Button />
        </Toggle>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showCodons: showCodons(state)
  }
}

export default connect(mapStateToProps, { doShowCodons })(Options)