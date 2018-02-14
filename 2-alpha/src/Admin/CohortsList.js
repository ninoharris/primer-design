import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CohortsList = ({ cohorts }) => {
  const cohortsDOM = cohorts.map((cohort) => {
    <li key={cohort.cohortID}>
      {cohort.cohortName}
    </li>
  })

  return (
    <ul className="Cohorts-List">
      {cohortsDOM}
    </ul>
  )
}

const mapStateToProps = (state, ownProps) => {

}

export default CohortsList