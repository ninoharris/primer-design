import _ from 'lodash'
import React, { Component } from 'react'

class Loading extends Component {
  state = {
    dotsCount: 0,
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({dotsCount}) => ({
        dotsCount: dotsCount <= 5 ? dotsCount += 1 : 0
      }))
    }, 200)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render() {
    const text = 'Loading' + _.pad('', this.state.dotsCount, '.')
    return (
      <div className="Loading-Container">
        <div className="Loading">
          {text}
        </div>
      </div>
    )
  }
}

export default Loading