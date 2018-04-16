import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { updateCurrentStudentID, nextExercise } from '../actions'
import { getCurrentStudentID, getCurrentStudentProfile, getAvailableExercisesList } from '../selectors'

import { P } from './Text'
import { HighlightButton, Button, SecondaryButton } from './Button'
import { HighlightLink, Link } from './Link'
import Nav from './Nav'
import InputHint from '../Features/Game/InputHint'

export const Header = ({
  loggedIn = false,
  username = '',
  fullName = '',
  completedCount = 0,
  location = {pathname: ''},
  nextExercise,
  updateCurrentStudentID = () => {},
  exercisesLeft,
}) => {
  const userDisplay = loggedIn ? (
    <Nav.Right>

      {exercisesLeft > 1 ? <SecondaryButton onClick={nextExercise}>Skip lesson ({exercisesLeft} left)</SecondaryButton> : ''}

      <SecondaryButton onClick={() => updateCurrentStudentID(null)} className="ml-2 btn btn-warning log-out">
        {fullName} ({username})
      </SecondaryButton>
      
    </Nav.Right>
    ) : (
    <Nav.Right className="User-Display logged-out">
      <P>Not currently signed in</P>
      <HighlightButton onClick={() => { }} className="ml-2 btn btn-success log-in">
          Log In
      </HighlightButton>
    </Nav.Right>
  )

  const tutorialsLink =
    location.pathname.includes('/tutorials') ?
      <HighlightButton onClick={() => window.close()} className="btn btn-warning">Close tutorials</HighlightButton>
      :
      <HighlightLink target="_blank" to="/tutorials" className="btn btn-info mr-2">See tutorials</HighlightLink>

  return (
    <Nav>
      <Nav.Left>
        {tutorialsLink}
      </Nav.Left>
      <Nav.Center><InputHint /></Nav.Center>
      {userDisplay}
    </Nav>
  )
}

const mapStateToProps = (state) => {
  const loggedIn = !!getCurrentStudentID(state)
  if (!loggedIn) return { loggedIn }
  
  return {
    loggedIn,
    username: getCurrentStudentID(state),
    fullName: getCurrentStudentProfile(state).fullName,
    exercisesLeft: getAvailableExercisesList(state).length,
  }
}

export default withRouter(connect(mapStateToProps, { updateCurrentStudentID, nextExercise, getAvailableExercisesList })(Header))