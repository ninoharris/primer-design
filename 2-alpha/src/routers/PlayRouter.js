import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import GameWelcome from '../Features/Game/GameWelcome'
import Game from '../Features/Game'

export class PlayRouter extends Component {
  state = {
    studentReady: false,
    exercisesReady: false,
  }
  render() {
    // if logged out
    if(!this.props.currentStudentID) return (
      <Switch>
        <Redirect from="/play" to="/play/welcome" />
        <Route path="/play/welcome" component={GameWelcome} />
      </Switch>
    )
    // if logged in
    return (
      <Switch>
        <Route path="/play/:id" component={Game} />
        <Route path="/play" component={Game} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, { })(PlayRouter)
// check if logged in, then show play route
// if not logged in, show welcome box