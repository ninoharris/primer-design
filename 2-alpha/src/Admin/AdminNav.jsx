import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { startAdminLogout } from '../actions/auth'
import { getCurrentAuthor } from '../selectors/admin'

import RecentCohort from './RecentCohort'
import Nav from '../components/Nav'
import { Button } from '../components/Button'
import { Link, HighlightLink } from '../components/Link'

const ViewCohortsOrBackHome = ({ pathname = '' }) => {
  if(pathname.includes('/cohorts') || pathname === '/admin/dashboard') {
    return <Link to="/admin">Back to home</Link>
  }
  return <HighlightLink to="/admin">All reports</HighlightLink>
}

const Container = styled.div`

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
  return (
    <Container>
      <Nav>
        <Nav.Left />
        <Nav.Center>
          <RecentCohort />
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

export default withRouter(connect(mapStateToProps, { startAdminLogout })(AdminNav))