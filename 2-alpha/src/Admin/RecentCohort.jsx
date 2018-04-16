import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';

import { getRecentCohortID, getRecentCohort } from '../selectors/admin'
import { fetchCohort } from '../actions/admin'

import { RaisedBox } from '../components/Container'
import { PLight } from '../components/Text'

const Container = RaisedBox.extend`
  padding: 6px;
  > * {
    padding: 6px 10px;
  }
`

const P = PLight.extend`
  display: inline;
`

class RecentCohort extends Component {
  fetchCohort() {
    if(this.props.cohortID) {
      this.props.fetchCohort(this.props.cohortID)
    }
  }
  componentDidUpdate() { this.fetchCohort() }
  componentDidMount() { this.fetchCohort() }
  render() {
    if(!this.props.cohortID) return null
    const { studentCount, exerciseCount, cohortName, cohortID } = this.props
    return (
      <Container>
        <strong>{cohortName}</strong>
        <Link to={`/admin/cohorts/${cohortID}`}><P>{studentCount} Students</P></Link>
        <Link to={`/admin/cohorts/${cohortID}/exercises/manage`}><P>{exerciseCount} Exercises</P></Link>
      </Container>
    )
  }
}
RecentCohort.propTypes = {
  studentCount: PropTypes.number,
  exerciseCount: PropTypes.number,
  cohortID: PropTypes.string,
  cohortName: PropTypes.string,
}

const mapStateToProps = (state) => {
  const recentCohortID = getRecentCohortID(state)
  if(!recentCohortID) return {}

  const recentCohort = getRecentCohort(state)
  if(!recentCohort) return {}

  return {
    studentCount: _.size(recentCohort.studentIDs),
    exerciseCount: _.size(recentCohort.exerciseIDs),
    cohortName: recentCohort.cohortName,
    cohortID: recentCohortID
  }
}

export default connect(mapStateToProps, {
  fetchCohort,
})(RecentCohort)