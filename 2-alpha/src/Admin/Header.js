import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const Header = ({ title, children, location, match, ...rest }) => {
  console.log('Rest of header location info:', rest)
  return (
    <div className="row">
      <div className="Nav">
        <div className="Logo">
          <h4>{title}</h4>
        </div>
        <div>
          {children}
          <Link to="/admin/create"><button className="btn btn-success mr-3">Add new exercise</button></Link>
          <button className="btn btn-info mr-3" onClick={() => { }}>View students</button>
          {location.pathname !== '/admin' ? <Link to="/admin" className="btn btn-success">Back to home</Link> : ''}
          <button className="btn btn-warning mr-3" onClick={() => { }}>Log out</button>
        </div>
      </div>
    </div>
  )
}


export default withRouter(Header)