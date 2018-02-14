import React from 'react'
import PropTypes from 'prop-types'

const CohortsListItem = ({ cohort }) => (
  <li>A cohort item with name: {cohort.cohortName} written by author: {cohort.authorFullName}</li>
)
CohortsListItem.propTypes = {
  cohort: PropTypes.objectOf({
    cohortID: PropTypes.string.isRequired,
    cohortName: PropTypes.string,
    authorID: PropTypes.string.isRequired,
    authorFullName: PropTypes.string.isRequired,
    studentIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    exerciseIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
}

export default CohortsListItem