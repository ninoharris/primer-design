import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchStudent, fetchCohortExerciseIDs, checkStudentExists } from '../actions'
import { getCurrentStudentID } from '../selectors'

import GameWelcome from '../Features/Game/GameWelcome'
import Game from '../Features/Game'

export class PlayRouter extends Component {
  state = {
    studentReady: false,
    cohortReady: false,
    exercisesReady: false,
  }
  componentDidMount() { this.getReadyWithStudentID() }
  componentDidUpdate() { this.getReadyWithStudentID() }

  getReadyWithStudentID = () => {
    const { currentStudentID } = this.props
    this.props.checkStudentExists(currentStudentID)
    .then((id) => this.props.fetchStudent(id).then(({ cohortID }) => {
        this.setState({ studentReady: true })
        return cohortID
      }))
      .then((cohortID) => this.props.fetchCohortExerciseIDs(cohortID).then(( exerciseIDs ) => {
        this.setState({ cohortReady: true })
        return exerciseIDs
      }))
    .then((exerciseIDs) => this.props.fetchExercises(exerciseIDs).then(() => {
        this.setState({ exercisesReady: true })
      }))
    .catch(err => {
      this.setState({ studentReady: false }) // student id doesnt exist, dont start game
    })
  }

  render() {
    // if logged out
    if(!this.props.currentStudentID) return (
      <Switch>
        <Redirect from="/play" to="/play/welcome" />
        <Route path="/play/welcome" component={GameWelcome} />
      </Switch>
    )
    // if logged in and everything's loaded
    if(this.state.studentReady && this.state.cohortReady && this.state.exercisesReady) {
      return (
        <Switch>
          <Route path="/play/:id" component={Game} />
          <Route path="/play" component={Game} />
        </Switch>
      )
    }
    // logged in but not loaded yet
    return <div>Signing in with student id: {this.props.currentStudentID}...</div>
  }
}

const mapStateToProps = (state) => ({
  currentStudentID: getCurrentStudentID(state)
})

export default connect(mapStateToProps, { fetchStudent, fetchCohortExerciseIDs, checkStudentExists })(PlayRouter)
// check if logged in, then show play route
// if not logged in, show welcome box