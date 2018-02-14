import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCohortsArray } from '../selectors/admin'
import { fetchCohorts } from '../actions/admin'

import CohortsListItem from './CohortsListItem'

class CohortsList extends Component {
  state = { ready: false }
  componentDidMount() {
    if (this.props.cohorts.length === 0) {
      this.props.fetchCohorts().then(() => this.setState({ ready: true }))
    }
  }
  render() {
    return (
      <ul className="Cohorts-List">
        { this.state.ready ?
          this.props.cohorts.map(cohort => <CohortsListItem cohort={cohort} />) :
          <li>Loading...</li>
        }
      </ul>
    )
  }
}

CohortsList.propTypes = {
  cohorts: PropTypes.arrayOf(PropTypes.objectOf({
    cohortID: PropTypes.string.isRequired,
    authorID: PropTypes.string.isRequired,
    studentIDs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    exerciseIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  cohorts: getCohortsArray
})

export default connect(mapStateToProps, { fetchCohorts })(CohortsList)