import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const TutorialLink = ({ tutorialNumber, completed, location, to, children, ...props}) => {
  console.log(location, props)
  const isActive = location.pathname === to
  return (
    <li className={`Tutorial-Link list-group-item ${isActive ? 'active' : ''}`}>
      <span className="tutorial-number">{tutorialNumber}</span>
      <Link to={to}>{children}</Link>
    </li>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}
  
export default withRouter(TutorialLink)