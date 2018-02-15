import React, { Component } from 'react'
import { connect } from 'react-redux'

// selectors and actions
import { fetchCohort } from '../actions/admin'
import { getCohort } from '../selectors/admin'
import { getCohortStudents } from '../selectors/admin'

// components
import AdminHeader from './AdminHeader'
import CohortExerciseList from './CohortExerciseList'

export class CohortPage extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    this.props.fetchCohort(this.props.cohortID).then(() => this.setState({ ready: true }))
  }
  render() {
    if(!this.state.ready) return <div>Loading...</div>
    const { cohort } = this.props
    return (
      <div className="container-fluid">
        <AdminHeader title={`Viewing cohort: ${cohort.cohortName}`} />
        <div className="row">
          <div className="col-12">
            {/* <CohortExerciseList cohortID={cohort.cohortID} /> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const cohortID = ownProps.match.params.id
  return {
    cohortID,
    cohort: getCohort(state, { cohortID })
  }
}

export default connect(mapStateToProps, { fetchCohort })(CohortPage)