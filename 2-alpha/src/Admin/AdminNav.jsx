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

const LatestCohort = ({

}) => {
  return (
    null
  )
}

const ViewCohortsOrBackHome = ({ pathname = '' }) => {
  console.log('pathname', pathname)
  if(pathname.includes('/cohort') || pathname === '/admin/dashboard') {
    return <Link to="/admin">Back to home</Link>
  }
  return <HighlightLink to="/admin">All reports</HighlightLink>
}

const Container = styled.div`
  margin-left: -15px;
  margin-right: -15px;
`

export const AdminNav = ({
  children,
  startAdminLogout,
  location,
  match,
  name = 'administrator',
  latestCohort = null,
  ...rest
}) => {
  console.log('location:', location)
  return (
    <Container>
      <Nav>
        <Nav.Left />
        <Nav.Center>
          {latestCohort && <LatestCohort />}
        </Nav.Center>
        <Nav.Right>
          <ViewCohortsOrBackHome location={location.pathname} />
          <Link to="/admin/exercises">Exercise database</Link>
          <Link to="/admin/my-account" className="btn btn-info mr-3">{name}</Link>
          <Button className="Logout-Button btn btn-warning mr-3" onClick={startAdminLogout}>Logout</Button>
        </Nav.Right>
      </Nav>
    </Container>
  )
}

const mapStateToProps = (state) => {
  const author = getCurrentAuthor(state)
  return {
    name: author ? author.fullName : ''
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAdminLogout: () => dispatch(startAdminLogout()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminNav))