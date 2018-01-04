import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Display extends Component {
  render() {
    if(!this.props.exercise) {
      return <div>Loading...</div>
    }
    const { question, haystack, vector, constructStart, constructEnd } = this.props.exercise
    return (
      <div>
        <strong>{question}</strong>
        <div className="vector">
          <div className="sequence">
            {vector}
          </div>
        </div>
        <div className="haystack">
          <div className="sequence">
            {haystack}
          </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = () => {}

export default connect(mapStateToProps)(Display)