import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, HighlightButton } from '../../components/Button'
import { Link, SecondaryLink } from '../../components/Link';
import { Input } from '../../components/Input'

import { checkStudentExists, updateCurrentStudentID } from '../../actions'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100vh;
`
const Title = styled.h2`
  font: 40px/48px ${p => p.theme.fontStack};
  font-weight: 600;
  margin-bottom: 35px;
`
const P = styled.p`
  line-height: ${p => p.theme.pLineHeight};
  margin-bottom: ${p => p.theme.pMarginBottom};
  font-weight: bold;
`

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
      <Container>
          <div className="col-7 offset-md-2">
          <Title>Learn primer design using teaching techniques.</Title>
            <P>
              Primer Designer is an online application used to teach undergraduate primer design in biochemistry. This program contains a database of exercises to attempt. Inspired by sites such as Lynda and Khan Academy, this application uses pedagological techniques and instant answer feedback algorithms.
            </P>
            <P>
              You should have been given a username. Once you log in, you will be given a series of exercises that were assigned by your tutor. As you progress, your tutor will be able to see how many exercises you’ve completed.
            </P>

            <form onSubmit={this.submit}>
              <P>
              <Input value={username} onChange={this.updateInputUsername} placeholder={`Enter your username here…`} /><br />
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : '' }
                <HighlightButton type="submit" disabled={username.length === 0}>Students: Log me in</HighlightButton>
              </P>
            </form>

            <Link to="/tutorials">Not sure what to do? Read the tutorials here</Link>
          </div>
      </Container>
    )
  }
}

export default connect(null, { checkStudentExists, updateCurrentStudentID })(GameWelcome)