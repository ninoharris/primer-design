import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// selectors and actions
import { fetchCohort, fetchStudents } from '../actions/admin'
import { getCohort } from '../selectors/admin'

// components
import AdminHeader from './AdminHeader'
import CohortExerciseList from './CohortExerciseList'
import AddCohortExercise from './AddCohortExercise'
import StudentsList from './StudentsList'
import AddCohortStudent from './AddCohortStudent'

export class CohortPage extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    Promise.all([
      this.props.fetchCohort(this.props.cohortID).then((data) => this.props.fetchStudents(data.studentIDs))
    ]).then(() => this.setState({ ready: true }))
  }
  render() {
    if(!this.state.ready) return <div>Loading...</div>
    const { cohort, cohortID, students } = this.props
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
            <StudentsList cohortID={cohortID} studentIDs={cohort.studentIDs}>
              <button onClick={() => { }}></button>{/* TODO: FINISH STUDENTS BIT */}
            </StudentsList>
            <AddCohortStudent cohortID={cohortID} studentIDs={cohort.studentIDs} />
            <CohortExerciseList cohortID={cohortID} exerciseIDs={cohort.exerciseIDs} />
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

export default connect(mapStateToProps, { fetchCohort, fetchStudents })(CohortPage)