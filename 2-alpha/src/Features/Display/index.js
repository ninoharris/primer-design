import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestion} from '../../selectors'

import withLoading from '../../components/withLoading'
import Vector from '../Vector'
import Haystack from '../Haystack'

class Display extends Component {
  render() {
    const { part1, part2 } = this.props.question
    return (
      <div className="col-12">
        <div /* Invisible div to see width of 100 chars */ className="dummy-sizing"></div>
        <div className="question part-1">{part1}</div>
        <Vector />
        <div className="question part-2 mt-5">{part2}</div>
        <Haystack />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    question: getQuestion(state),
  }
}

export default withLoading()(connect(mapStateToProps)(Display))