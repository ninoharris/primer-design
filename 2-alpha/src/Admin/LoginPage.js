import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startAdminLogin } from '../actions/auth'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Nav from '../components/Nav';
import { HighlightButton } from '../components/Button'
import { HighlightLink } from '../components/Link'
import { P, PLight, BigTitle } from '../components/Text'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100vh;
`

export const LoginPage = ({
  startLogin
}) => {
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
          <BigTitle>Educator login</BigTitle>
          <P>Log in to admin section with your gmail account. If you dont already have a primer designer account then your gmail account will be assigned one.</P>
          <HighlightButton onClick={startLogin} className="Login-Button btn btn-primary">Log in</HighlightButton>
        </div>
      </Container>
    </div>
  )
}
LoginPage.propTypes = {
  startLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => dispatch(startAdminLogin)
  }
}

// export default connect(null, { startLogin })(LoginPage)
export default withRouter(connect(null, mapDispatchToProps)(LoginPage))