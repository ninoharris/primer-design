import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CohortsListItem = ({ cohortID, cohortName, authorFullName, exerciseIDs = {}, studentIDs = {} }) => (
  <div className="list-group-item">
    <Link to={`/admin/cohorts/view/${cohortID}`}><h4>{cohortName} - <small>{cohortID}</small></h4></Link>
    <span>Author Name: {authorFullName}</span>
    {` | `}<span>{_.size(exerciseIDs)} exercises</span>
    {` | `}<span>{_.size(studentIDs)} students</span>
  </div>
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