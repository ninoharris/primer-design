import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// Firebase authentication determines redirects
import db, { firebase } from '../firebase/firebase'
import { history } from './Router'

// actions
import { firebasePathExists } from '../api'
import { fetchAuthors } from '../actions/admin'
import { adminLogin, startAdminLogout } from '../actions/auth'

// selectors 
import { getCurrentAuthorUid } from '../selectors/admin'

// Components
import LoginPage from '../Admin/LoginPage'
import AdminHomePage from '../Admin/AdminHomePage'
import AdminEditPage from '../Admin/AdminEditPage'
import AdminCreatePage from '../Admin/AdminCreatePage'
import MyAccountPage from '../Admin/MyAccountPage'


class AdminRouter extends Component {
  state = {
    dbAuthorsReady: false,
  }
  componentDidMount() {
    // check if logged in/logged out, then send off action to notify the redux store.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // tell the store user is logged in, then redirect to wanted page.
        this.props.adminLogin(user.uid, history.location.pathname) 

        // Fetch author IDs, students, etc.
        this.props.fetchAuthors()
          .then(() => this.setState({ dbAuthorsReady: true }))
          // redirect if user's record isnt in db yet. this is required for uploading exercises etc.
          .then(() => firebasePathExists(db, `authors/${user.uid}/fullName`)).catch(() => history.push('/admin/my-account'))
          
      } else {
        this.props.startAdminLogout() // tell the store the user is logged out
      }
    })
  }

  render() {
    if(!this.props.adminLoggedIn) {
      return <Route path="/admin" component={LoginPage} />
    }
      
    if(!this.state.dbAuthorsReady) return null // show nothing until we've got data from the server. TODO: replace with loading screeeeeeen!

    return (
      <Switch>
        <Redirect exact path="/admin" to="/admin/dashboard" /* Skip login page */ /> 
        <Route exact path="/admin" component={LoginPage} />
        <Route exact path="/admin/create" component={AdminCreatePage} />
        <Route exact path="/admin/edit/:id" component={AdminEditPage} />
        <Route exact path="/admin/dashboard" component={AdminHomePage} />
        <Route path="/admin/my-account" component={MyAccountPage} />
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