import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { startAdminLogout } from '../actions/auth'

import { getCurrentAuthor } from '../selectors/admin'

export const AdminHeader = ({ 
  title, 
  children,
  startAdminLogout,
  location, 
  match, 
  name = 'administrator',
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
          <Link to="/admin/cohorts" className="btn btn-info mr-3">View cohorts</Link>
          {location.pathname !== '/admin' ? <Link to="/admin" className="btn btn-success Goto-Home">Back to home</Link> : ''}
          <span className="Author-Name">{name}</span>
          <Link to="/admin/my-account" className="btn btn-info mr-3">My Account</Link>
          <button className="Logout-Button btn btn-warning mr-3" onClick={startAdminLogout}>Log out</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const author = getCurrentAuthor(state)
  return {
    name: author ? author.fullName : ''
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAdminLogout: () => dispatch(startAdminLogout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHeader))