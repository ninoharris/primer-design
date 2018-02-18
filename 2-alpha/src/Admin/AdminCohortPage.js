import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// selectors and actions
import { fetchCohort } from '../actions/admin'
import { getCohort } from '../selectors/admin'

// components
import AdminHeader from './AdminHeader'
import CohortExerciseList from './CohortExerciseList'
import AddCohortExercise from './AddCohortExercise'

export class CohortPage extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    this.props.fetchCohort(this.props.cohortID).then(() => this.setState({ ready: true }))
  }
  render() {
    if(!this.state.ready) return <div>Loading...</div>
    const { cohort, cohortID } = this.props
    console.log('In cohort page: ', cohort.exerciseIDs)
    return (
      <div className="container-fluid">
        <AdminHeader title={`Viewing cohort: ${cohort.cohortName}`} />
        <div className="row">
          <div className="col-12">
            <h4>General cohort info</h4>
            {/* <Link to={`/admin/cohorts/edit/${cohortID}`}>Edit cohort</Link> */}
          </div>
          <div className="col-12">
            <CohortExerciseList exerciseIDs={cohort.exerciseIDs} />
            <AddCohortExercise cohortID={cohortID} exerciseIDs={cohort.exerciseIDs} />
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