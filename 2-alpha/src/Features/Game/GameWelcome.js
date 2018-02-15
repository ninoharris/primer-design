import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkStudentExists, updateCurrentStudentID } from '../../actions'

export class GameWelcome extends Component {
  state = {
    error: null,
    username: ''
  }
  submit = (e) => {
    e.preventDefault()
    this.props.checkStudentExists(this.state.username).then(({ id }) => {
      this.setState({ error: null})
      this.props.updateCurrentStudentID(id)
      this.props.history.push('/play')
    }).catch((error) => {
      this.setState({ error })
    })
  }
  updateInputUsername = (e) => {
    this.setState({ username: e.target.value })
  }
  render() {
    const { error, username } = this.state
    return (
      <div className="text-center">
        <h3>Welcome to primer designer</h3>
        <p><strong>Log in with your student username to continue.</strong> This is given by your lab supervisors or your oxford username.</p>
        <form onSubmit={this.submit}>
          <input value={username} onChange={this.updateInputUsername} />
          {error ? 
            <div className="alert alert-danger" role="alert">{error}</div>
            : ''
          }
          <button type="submit">Start!</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { checkStudentExists, updateCurrentStudentID })(GameWelcome)