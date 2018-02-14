import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCohorts } from '../selectors/admin'
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
    console.log('CohortsList', this.props)
    return (
      <ul className="Cohorts-List">
        { this.state.ready ?
          this.props.cohorts.map(cohort => <CohortsListItem key={cohort.cohortID} cohort={cohort} />) :
          // this.props.cohorts.map(cohort => cohort.cohortID) :
          <li>Loading...</li>
        }
      </ul>
    )
  }
}

CohortsList.propTypes = {
  cohorts: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  cohorts: getCohorts(state)
})

export default connect(mapStateToProps, { fetchCohorts })(CohortsList)