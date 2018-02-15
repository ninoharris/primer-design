import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { updateCurrentStudentID } from '../actions'
import { getCurrentStudentID, getCurrentStudentProfile } from '../selectors'

export const Header = ({
  loggedIn = false,
  username = '',
  completedCount = 0,
  location = {pathname: ''},
  updateCurrentStudentID = () => {},
}) => {
  const userDisplay = loggedIn ? (
    <div className="User-Display logged-in">
      <span>Logged in as: <span className="username">{username}</span></span>
      <span className="exercises-completed">{completedCount} completed</span>
      <button onClick={() => updateCurrentStudentID(null)} className="ml-2 btn btn-warning log-out">
        Log Out
      </button>
    </div>
    ) : (
    <div className="User-Display logged-out">
      <span>Not currently signed in</span>
      <button onClick={() => { }} className="ml-2 btn btn-success log-in">
          Log In
      </button>
    </div>
  )

  return (
    <div className="row">
      <div className="Nav">
        <div className="Logo">
          <h3 className="mb-0">Primer Designer</h3>
        </div>
        <div className="text-right">
          <div className="float-left mr-3 ml-3">{userDisplay}</div>
          {location.pathname.includes('/tutorials') ?
            <a onClick={() => window.close()} className="btn btn-warning">Close tutorials</a>
           : 
            <a target="_blank" href="/tutorials" className="btn btn-info mr-2">
              See tutorials
            </a>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const loggedIn = !!getCurrentStudentID(state)
  if (!loggedIn) return { loggedIn }
  
  return {
    loggedIn,
    username: getCurrentStudentProfile(state).fullName
  }
}

export default withRouter(connect(mapStateToProps, { updateCurrentStudentID })(Header))