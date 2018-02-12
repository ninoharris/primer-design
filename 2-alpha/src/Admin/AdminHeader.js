import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { startAdminLogout } from '../actions/auth'


export const AdminHeader = ({ 
  title, 
  children,
  startAdminLogout,
  location, 
  match, 
  ...rest 
}) => {
  return (
    <div className="row">
      <div className="Nav">
        <div className="Logo">
          <h4>{title}</h4>
        </div>
        <div>
          {children}
          {location.pathname !== '/admin/create' && !location.pathname.includes('/admin/edit') && 
          <Link to="/admin/create"><button className="btn btn-success mr-3">Add new exercise</button></Link>}
          <button className="btn btn-info mr-3" onClick={() => { }}>View students</button>
          {location.pathname !== '/admin' ? <Link to="/admin" className="btn btn-success Goto-Home">Back to home</Link> : ''}
          <button className="Logout-Button btn btn-warning mr-3" onClick={startAdminLogout}>Log out</button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAdminLogout: () => dispatch(startAdminLogout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminHeader))