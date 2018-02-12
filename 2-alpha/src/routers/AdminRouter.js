import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// Firebase authentication determines redirects
import db, { firebase } from '../firebase/firebase'
import { history } from './Router'

import { fetchAuthors } from '../actions/admin'
import { adminLogin, startAdminLogout } from '../actions/auth'

// Components
import LoginPage from '../Admin/LoginPage'
import AdminHomePage from '../Admin/AdminHomePage'
import AdminEditPage from '../Admin/AdminEditPage'
import AdminCreatePage from '../Admin/AdminCreatePage'



class AdminRouter extends Component {
  componentDidMount() {
    // check if logged in/logged out, then send off action to notify the redux store.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.adminLogin(user.uid, history.location.pathname)
      } else {
        this.props.startAdminLogout()
      }
    })
    // Fetch author IDs, name etc.
    this.props.fetchAuthors()
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

export default connect(mapStateToProps, { adminLogin, startAdminLogout, fetchAuthors })(AdminRouter)