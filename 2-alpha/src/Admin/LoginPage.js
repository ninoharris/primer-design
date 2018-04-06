import React from 'react'
import { firebase, googleAuthProvider } from '../firebase/firebase'
import PropTypes from 'prop-types'
import Nav from '../components/Nav';
import { HighlightButton } from '../components/Button'
import { HighlightLink } from '../components/Link'
import { P, PLight, BigTitle } from '../components/Text'
import { Container } from '../components/Container'

const Title = BigTitle.extend`
  margin-top: 5rem;
`

const startAdminLogin = () => firebase.auth().signInWithPopup(googleAuthProvider)

export const LoginPage = () => {
  return (
    <div>
      <Nav>
        <Nav.Left />
        <Nav.Right>
          <HighlightLink to="/play">Student Login</HighlightLink>
        </Nav.Right>
      </Nav>
      <Container>
        <div className="col-7 offset-md-2">
          <Title>Educator login</Title>
          <P>Log in to admin section with your gmail account. If you dont already have a primer designer account then your gmail account will be assigned one.</P>
          <HighlightButton onClick={startAdminLogin} className="Login-Button btn btn-primary">Log in</HighlightButton>
        </div>
      </Container>
    </div>
  )
}

// export default connect(null, { startLogin })(LoginPage)
export default LoginPage