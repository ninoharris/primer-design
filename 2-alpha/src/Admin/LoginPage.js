import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({
  startLogin
}) => {
  return (
    <div className="Login-Page">
      <div className="container-fluid">
        <div className="row Login-Page-Header">
          Primer designer admin hub
        </div>
        <div className="row">
          <div className="col-4">
            Log in to admin section
            <button onClick={startLogin} className="btn btn-primary">Log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
LoginPage.propTypes = {
  startLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => dispatch(startLogin)
  }
}

// export default connect(null, { startLogin })(LoginPage)
export default connect(null, mapDispatchToProps)(LoginPage)