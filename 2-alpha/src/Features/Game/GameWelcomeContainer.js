import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Nav from '../../components/Nav'
import { Button, HighlightButton, SecondaryButton} from '../../components/Button'
import { SecondaryLink, HighlightLink } from '../../components/Link';
import { ConcavedInput } from '../../components/Input'
import { Container, P, PLight, BigTitle } from '../../components/Text'

import { checkStudentExists, updateCurrentStudentID } from '../../actions'
import { startAdminLogin } from '../../actions/auth'


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
      <div>
        <Nav>
          <Nav.Left>
            <HighlightLink to="/tutorials">View Tutorials</HighlightLink>
          </Nav.Left>
          <Nav.Right>
            <PLight>Not yet logged in</PLight>
            <SecondaryLink to="/admin">Lecturer/Admin Login</SecondaryLink>
          </Nav.Right>
        </Nav>
        <Container>
          <div className="col-7 offset-md-2">
          <BigTitle>Learn primer design using teaching techniques.</BigTitle>
            <P>
              Primer Designer is an online application used to teach undergraduate primer design in biochemistry. This program contains a database of exercises to attempt. Inspired by sites such as Lynda and Khan Academy, this application uses pedagological techniques and instant answer feedback algorithms.
            </P>
            <P>
              You should have been given a username. Once you log in, you will be given a series of exercises that were assigned by your tutor. As you progress, your tutor will be able to see how many exercises you’ve completed.
            </P>

            <form onSubmit={this.submit}>
              <P>
                <ConcavedInput style={{marginBottom: 10, width: 240, fontWeight: 'bold'}} value={username} onChange={this.updateInputUsername} placeholder={`Enter your username here…`} /><br />
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : '' }
                <HighlightButton type="submit" disabled={username.length === 0}>Students: Log me in</HighlightButton>
              </P>
            </form>

          <SecondaryLink to="/tutorials">Not sure what to do? Read the tutorials here</SecondaryLink>
          </div>
        </Container>
      </div>
    )
  }
}

export default connect(null, { checkStudentExists, updateCurrentStudentID, startAdminLogin })(GameWelcome)