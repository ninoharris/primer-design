import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getCohortExercises } from '../../selectors/admin'
import { getStudentsWithCompletions } from '../../selectors/admin'
import { fetchStudents } from '../../actions/admin'

import CohortStudentsListItem from './CohortStudentsListItem';
import { TitleNoMargins, PNoMargins } from '../../components/Text'

const Container = styled.div`
  margin: 1.5rem 0;
`

const P = PNoMargins.extend`

`

export class CohortStudentsView extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    this.props.fetchStudents(this.props.studentIDs)
    .then(() => this.setState({ ready: true }))
  }
  render() {
    const { cohortID, studentIDs, students, totalExercisesCount } = this.props
    const studentCount = _.keys(studentIDs).length
    if(studentCount === 0) return <TitleNoMargins>No students found.</TitleNoMargins>
    if(!this.state.ready) return <div>Loading {studentCount} students...</div>
    console.log('students', students)
    return (
      <Container>
        <TitleNoMargins>Showing {studentCount} students.</TitleNoMargins>
        <div className="row">
          <div className="col-2">
          </div>
          <div className="col-2">
            <P>Completed</P>
          </div>
          <div className="col-2">
            <P>Unfinished</P>
          </div>
          <div className="col-2">
            <P>Unattempted</P>
          </div>
          <div className="col-2">
          </div>
        </div>
        {_.map(students, (student, studentID) => {
          const { completedCount = 0, unfinishedCount = 0, attemptsCount = {} } = student.summary || {}
          const unattemptedCount = totalExercisesCount - (completedCount + unfinishedCount)
          return <CohortStudentsListItem key={studentID} studentID={studentID} {...student} 
            totalExercisesCount={totalExercisesCount} 
            completedCount={completedCount}
            unfinishedCount={unfinishedCount}
            unattemptedCount={unattemptedCount}
            attemptsCount={attemptsCount}
            />
        })}
      </Container>
    )
  }
}

const mapStateToProps = (state, {studentIDs, cohortID}) => {
  return {
    students: getStudentsWithCompletions(state, { studentIDs }),
    totalExercisesCount: _.size(getCohortExercises(state, { cohortID})),
  }
}

export default connect(mapStateToProps, { fetchStudents })(CohortStudentsView)