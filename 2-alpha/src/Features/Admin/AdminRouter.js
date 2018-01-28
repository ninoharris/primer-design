import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'

const AdminLayoutPre = ({ title }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="Nav">
          <div className="Logo">
            <h2>{title}</h2>
          </div>
          <div>
            <Link to="/admin"><button className="btn btn-primary">Back to home</button></Link>
          </div>
        </div>
      </div>
      {}
    </div>
  )
}

export default AdminLayoutPre