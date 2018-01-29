import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMultilineWidth } from '../actions/index'
import { getMultilineWidth } from '../selectors'

class MultilineWidth extends Component {
  componentDidMount() {
    // More hacky than a oxford union hackathon with knives.
    this.props.setMultilineWidth(this.el.offsetWidth)
  }
  render() {
    if(this.props.charMultilineWidth) {
      const charMultilineWidth = Number(this.props.charMultilineWidth) + 2
      const css = `
        .sequence { letter-spacing: 1px; }
        .multiline .sequence { width: ${charMultilineWidth}px }
        .sequence-line-big {letter-spacing: 1px; width: ${charMultilineWidth * 1.021}px !important }
      `
      return (<style>{css}</style>)
    }
    return <span 
      style={{ letterSpacing: '1px' }}
      className="multilineWidth sequence" ref={el => this.el = el}>ACACCCACCAATGTGCGACCGATTAGCTGGACCACTTGTGCAAAGCTGTGCCACCCGACTTCGCTCGTGCAGGGTACGTGGGGCACAGCG</span>
  }
}

const mapStateToProps = (state) => ({ charMultilineWidth: getMultilineWidth(state) })

export default connect(mapStateToProps, { setMultilineWidth })(MultilineWidth)