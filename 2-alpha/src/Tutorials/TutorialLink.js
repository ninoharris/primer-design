import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const TutorialLink = ({ tutorialNumber, completed, location, to, children, ...props}) => {
  const isActive = location.pathname === to
  return (
    <li className={`Tutorial-Link list-group-item ${isActive ? 'active' : ''}`}>
      <span className="tutorial-number">{tutorialNumber}</span>
      <Link to={to}>{children}</Link>
    </li>
  )
}

TutorialLink.propTypes = {
  tutorialNumber: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

const mapStateToProps = (state) => {
  return {

  }
}
  
export default withRouter(TutorialLink)