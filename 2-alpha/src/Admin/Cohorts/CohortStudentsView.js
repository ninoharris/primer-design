import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import StudentsList from './StudentsList'
import { getStudents } from '../selectors/admin';
import { fetchStudents } from '../actions/admin'
import { Link } from 'react-router-dom';

  // <AddCohortStudent cohortID={cohortID} studentIDs={cohort.studentIDs} />

export const ViewStudentButton = ({ studentID }) => (
  <Link to={`/admin/students/${studentID}`}>View Progress</Link>
)

export class CohortStudentsView extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    this.props.fetchStudents(this.props.studentIDs)
    .then(() => this.setState({ ready: true }))
  }
  render() {
    const { cohortID, studentIDs, students} = this.props
    const studentCount = _.keys(studentIDs).length
    if(studentCount === 0) return <div>No students found.</div>
    if(!this.state.ready) return <div>Loading {studentCount} students...</div>
    console.log('students', students)
    return (
      <div>
        Summary: {studentCount} students.
        <StudentsList cohortID={cohortID} students={students}>
          <ViewStudentButton />
        </StudentsList>
      </div>
    )
  }
}

const mapStateToProps = (state, {studentIDs}) => {
  return {
    students: getStudents(state, { studentIDs })
  }
}

export default connect(mapStateToProps, { fetchStudents })(CohortStudentsView)