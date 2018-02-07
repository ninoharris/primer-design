import React from 'react'

const Header = ({
  loggedIn = false,
  username = '',
  completedCount = 0,
}) => {
  const userDisplay = loggedIn ? (
    <div className="logged-in">
      <p>Logged in as: <span className="username">{username}</span></p>
      <p className="exercises-completed">{completedCount} completed</p>
      <button onClick={() => { }} className="btn btn-warning log-out">
        Log Out
      </button>
    </div>
    ) : (
    <div className="logged-out">
      <p>Not currently signed in</p>
      <button onClick={() => { }} className="btn btn-success log-in">
          Log Out
      </button>
    </div>
  )

  return (
    <div className="row">
      <div className="Nav">
        <div className="Logo">
          <h3 className="mb-0">Primer Designer</h3>
        </div>
        <div>
          <button onClick={() => { }} className="btn btn-info" /* TODO: update with tutorial pages */>
            See tutorial
            </button>
          {userDisplay}
        </div>
      </div>
    </div>
  )
}

export default Header