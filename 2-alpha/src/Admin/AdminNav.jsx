import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { startAdminLogout } from '../actions/auth'
import { getCurrentAuthor, getLatestCohort } from '../selectors/admin'

import Nav from '../components/Nav'
import { Title, PLight } from '../components/Text'
import { Button, HighlightButton, SecondaryButton } from '../components/Button'
import { Link, SecondaryLink, HighlightLink } from '../components/Link'

export const LatestCohort = ({

}) => {
  return (
    null
  )
}

export const ViewCohortsOrBackHome = ({ location = '/admin' }) => {
  if(location.includes('/cohort') || location === '/admin') {
    return <Link to="/admin">Back to home</Link>
  }
  return <HighlightLink to="/admin">All reports</HighlightLink>
}

export const AdminNav = ({
  children,
  startAdminLogout,
  location,
  match,
  name = 'administrator',
  latestCohort = null,
  ...rest
}) => {
  return (
    <Nav>
      <Nav.Left />
      <Nav.Center>
        {latestCohort && <LatestCohort />}
      </Nav.Center>
      <Nav.Right>
        <ViewCohortsOrBackHome />
        <Link to="/exercises">Exercise database</Link>
        <Link to="/admin/my-account" className="btn btn-info mr-3">{name}</Link>
        <Button className="Logout-Button btn btn-warning mr-3" onClick={startAdminLogout}>Logout</Button>
      </Nav.Right>
    </Nav>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminNav))