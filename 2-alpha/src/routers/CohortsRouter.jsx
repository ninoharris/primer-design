import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { firebasePathExists } from '../api'

import CohortsPage from '../Admin/Cohorts/CohortsPage'
import CohortManagePage from '../Admin/Cohorts/CohortManagePage'
import { BigTitle } from '../components/Text'
import { Container } from '../components/Container'

// Firebase authentication determines redirects
import db from '../firebase/firebase'
import { history } from './Router'

const NotFound = ({ match: { params }}) => (
  <Container>
    <BigTitle>Sorry, the cohort with id of `{params}` hasn't been found. Click a link above in the navigation to be redirected.</BigTitle>
  </Container>
)

class CohortsRouter extends Component {
  state = {
    checkingCohort: true,
  }
  checkCohortExists() {
    // upon each url change to a specific cohort, check cohort exists.

    const { id } = this.props.match.params
    console.log(id)
    if (!id || id === '') { // going to general cohorts page
      this.setState({ checkingCohort: false })
      return
    }
    firebasePathExists(db, `cohorts/${id}`).then(() => {
      this.setState({ checkingCohort: false })
      
    }).catch(() => {
      history.push(`/admin/cohorts/not-found/${id}`)
    })
  }
  componentDidMount() { this.checkCohortExists() }

  render() {
    if(this.state.checkingCohort) {
      return <Container>Checking cohort...</Container>
    }
    return (
      <Switch>
        {/* <Route path="/admin/cohorts/:id/exercises/manage" component={AdminCohortsList} /> */}
        {/* <Route path="/admin/cohorts/:id/exercises" component={AdminCohortsList} /> */}
        <Route path="/admin/cohorts/:id/manage" component={CohortManagePage} />
        {/* <Route path="/admin/cohorts/:id/students" component={AdminCohortsList} /> */}
        {/* <Route exact path="/admin/cohorts/:id" component={AdminCohortPage} /> */}
        <Route path="/admin/cohorts" component={CohortsPage} />
        <Route path="/admin/cohorts/not-found/:id" component={NotFound} />
      </Switch>
    )
  }
}

export default CohortsRouter