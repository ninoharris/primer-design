import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as paths from '../api/paths'

// Firebase authentication determines redirects
import db, { firebase } from '../firebase/firebase'
import { history } from './Router'

// actions
import { firebasePathExists } from '../api'
import { fetchAuthors, fetchStudents } from '../actions/admin'
import { adminLogin, startAdminLogout } from '../actions/auth'

// Components
import LoginPage from '../Admin/LoginPage'
import AdminHomePage from '../Admin/AdminHomePage'
import AdminExercisesPage from '../Admin/AdminExercisesPage'
import ExerciseEditPage from '../Admin/ExerciseEditPage'
import ExerciseCreatePage from '../Admin/ExerciseCreatePage'
import MyAccountPage from '../Admin/MyAccountPage'
import CohortsRouter from './CohortsRouter'
import AddCohortPage from '../Admin/Cohorts/AddCohortPage';


class AdminRouter extends Component {
  state = {
    dbAuthorsReady: false,
    // dbStudentsReady: false,
  }
  componentDidMount() {
    // check if logged in/logged out, then send off action to notify the redux store.
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // tell the store user is logged in, then redirect to wanted page.
        this.props.adminLogin(user.uid, history.location.pathname) 

        // Fetch author IDs, students, etc.
        this.props.fetchAuthors()
          .then(() => this.setState({ dbAuthorsReady: true }))
          // redirect if user's record isnt in db yet. this is required for uploading exercises etc.
          .then(() => firebasePathExists(db, `authors/${user.uid}/fullName`)).catch(() => history.push('/admin/my-account'))

        // this.props.fetchStudents() // never do a mass fetch of students, just go for a few at a time.
        //   .then(() => this.setState({ dbStudentsReady: true }))
          
      } else {
        this.props.startAdminLogout() // tell the store the user is logged out
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    if(!this.props.adminLoggedIn) {
      return <Route path="/admin" component={LoginPage} />
    }
      
    if(!this.state.dbAuthorsReady) return null // show nothing until we've got data from the server. TODO: replace with loading screeeeeeen!

    return (
      <Switch>
        <Redirect exact path="/admin" to={"/admin/cohorts"} /* Skip login page */ /> 
        <Route exact path="/admin" component={LoginPage} />
        <Route exact path="/admin/exercises/create" component={ExerciseCreatePage} />
        <Route exact path="/admin/exercises/edit/:id" component={ExerciseEditPage} />
        <Route exact path="/admin/exercises" component={AdminExercisesPage} />
        <Route path="/admin/cohorts/add" component={AddCohortPage} />
        <Route path="/admin/cohorts/:id?" component={CohortsRouter} />
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

export default connect(mapStateToProps, { adminLogin, startAdminLogout, fetchAuthors, fetchStudents })(AdminRouter)