import { flatMap } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchCohorts } from '../actions/admin'
import { getCohorts } from '../selectors/admin'

import AdminHeader from './AdminHeader'
import CohortsList from './CohortsList'

class CohortsPage extends Component {
  state = { ready: false }
  componentDidMount () {
    if(this.props.cohorts.length === 0) {
      this.props.fetchCohorts().then(() => this.setState({ ready: true }))
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <AdminHeader title="Viewing exercises" />
        <div className="row">
          <div className="col-12">
            {this.state.ready ? <CohortsList cohorts={this.props.cohorts} /> : <div>Loading...</div>}
          </div>
        </div>
      </div>
    )
  }
}
CohortsPage.propTypes = {
  cohorts: PropTypes.arrayOf(PropTypes.objectOf({
    cohortID: PropTypes.string.isRequired,
    authorID: PropTypes.string.isRequired,
    studentIDs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    exerciseIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired
}

const mapStateToProps = (state) => {
  return {
    cohorts: flatMap(getCohorts(state), (val, cohortID) => ({...val, cohortID}))
  }
}

export default connect(mapStateToProps, { fetchCohorts })(CohortsPage)