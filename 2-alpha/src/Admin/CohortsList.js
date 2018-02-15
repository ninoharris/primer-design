import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCohorts } from '../selectors/admin'
import { fetchCohorts } from '../actions/admin'

import CohortsListItem from './CohortsListItem'

class CohortsList extends Component {
  state = { ready: false }
  componentDidMount() {
    this.props.fetchCohorts().then(() => this.setState({ ready: true }))
  }
  render() {
    const { cohorts } = this.props
    return (
      <ul className="Cohorts-List list-group">
        { ( cohorts.length || this.state.ready ) ?
          cohorts.map(cohort => <CohortsListItem key={cohort.cohortID} {...cohort} />) :
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