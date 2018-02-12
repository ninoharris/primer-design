import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// Firebase authentication determines redirects
import { firebase } from '../firebase/firebase'
import { history } from './Router'

import { adminLogin, startAdminLogout } from '../actions/auth'

// Components
import LoginPage from '../Admin/LoginPage'
import AdminHomePage from '../Admin/AdminHomePage'
import AdminEditPage from '../Admin/AdminEditPage'
import AdminCreatePage from '../Admin/AdminCreatePage'



class AdminRouter extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.adminLogin(user.uid, history.location.pathname)
      } else {
        this.props.startAdminLogout()
      }
    })
  }
  render() {
    return (
      <Switch>
        {this.props.adminLoggedIn ? 
          <Redirect exact path="/admin" to="/admin/dashboard" /> : // Skip login page
          <Route path="/admin" component={LoginPage} />
        }
        <Route exact path="/admin" component={LoginPage} />
        <Route exact path="/admin/create" component={AdminCreatePage} />
        <Route exact path="/admin/edit/:id" component={AdminEditPage} />
        <Route exact path="/admin/dashboard" component={AdminHomePage} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    adminLoggedIn: state.adminLoggedIn,
  }
}

export default connect(mapStateToProps, { adminLogin, startAdminLogout })(AdminRouter)