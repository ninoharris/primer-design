import React from 'react'

const Header = ({
  loggedIn = false,
  username = '',
  completedCount = 0,
}) => {
  const userDisplay = loggedIn ? (
    <div className="float-right logged-in">
      <span>Logged in as: <span className="username">{username}</span></span>
      <span className="exercises-completed">{completedCount} completed</span>
      <button onClick={() => { }} className="ml-2 btn btn-warning log-out">
        Log Out
      </button>
    </div>
    ) : (
      <div className="float-right logged-out">
      <span>Not currently signed in</span>
      <button onClick={() => { }} className="ml-2 btn btn-success log-in">
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
        <div className="text-right">
          <a target="_blank" href="/tutorials" className="btn btn-info mr-2" /* TODO: update with tutorial pages */>
            See tutorials
          </a>
          {userDisplay}
        </div>
      </div>
    </div>
  )
}

export default Header