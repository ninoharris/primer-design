import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// selectors and actions
import { fetchCohort } from '../actions/admin'
import { getCohort } from '../selectors/admin'

// components
import AdminHeader from './AdminHeader'
import CohortExerciseList from './CohortExerciseList'
import AddCohortExercise from './AddCohortExercise'
import CohortStudentsView from './CohortStudentsView'

export class CohortPage extends Component {
  componentDidMount () {
    this.props.fetchCohort(this.props.cohortID)
  }
  render() {
    const { ready, cohort, cohortID } = this.props
    if(!ready) return <div>Loading...</div>
    return (
      <div className="container-fluid">
        <AdminHeader title={`Viewing cohort: ${cohort.cohortName}`} />
        <div className="row">
          <div className="col-12">
            <h4>General cohort info</h4>
            {/* <Link to={`/admin/cohorts/edit/${cohortID}`}
          
            INSIDE THIS WILL BE SUMMARY STUFF FROM LAMBDA FUNCTION
          
          >Edit cohort</Link> */}
          </div>
          <div className="col-12">
            {/* INSIDE THIS WILL BE BROUGHT IN BY ROUTER OR WITHIN THE PAGE ITSELF. AKA VIEW VS EDIT */}
            <CohortStudentsView cohortID={cohortID} studentIDs={cohort.studentIDs} />
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
  const cohort = getCohort(state, { cohortID })

  if(!cohort) return { 
    cohortID, 
    ready: false 
  } // not loaded yet

  return {
    cohortID,
    cohort,
    ready: true,
  }
}

export default connect(mapStateToProps, { fetchCohort })(CohortPage)