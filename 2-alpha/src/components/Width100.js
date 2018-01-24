import React, { Component } from 'react'
import { connect } from 'react-redux'
import { set100CharsWidth } from '../actions/index'
import { get100CharWidth } from '../selectors'

class Width100 extends Component {
  componentDidMount() {
    // More hacky than a oxford union hackathon with knives.
    this.props.set100CharsWidth(this.el.offsetWidth)
  }
  render() {
    if(this.props.charWidth100) {
      const charWidth100 = Number(this.props.charWidth100)
      const css = `
        .sequence { letter-spacing: 1px; }
        .multiline .sequence, sequence-100 { width: ${charWidth100}px }
        .sequence-101 {letter-spacing: 1px; width: ${charWidth100 * 1.011}px !important }
        .sequence-102 {letter-spacing: 1px; width: ${charWidth100 * 1.021}px !important }
      `
      return (<style>{css}</style>)
    }
    return <span 
      style={{ letterSpacing: '1px' }}
      className="width100 sequence" ref={el => this.el = el}>TCGCATATTACAAGCGACAAGATTCGTATAAATGGTCCAATTAGTGACCAGTGAGATCGATGTATTGTGTCCCCGACCACATCTACGTATATTGCAAGCT</span>
  }
}

const mapStateToProps = (state) => ({ charWidth100: get100CharWidth(state) })

export default connect(mapStateToProps, { set100CharsWidth })(Width100)