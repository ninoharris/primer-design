import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import CohortEditStudent from './CohortEditStudent'
import { Title } from '../../components/Text'
import Loading from '../../components/Loading'
import { fetchStudents, updateStudent } from '../../actions/admin'
import { getStudentsOverview } from '../../selectors/admin'

const Container = styled.div`
  
`

export class CohortEditStudents extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    this.props.fetchStudents(this.props.studentIDs).then(() => {
      this.setState({ ready: true })
    })
  }
  render() {
    const { studentIDs, cohortName } = this.props
    const studentCount = _.size(studentIDs)
    if (!this.state.ready) return <Loading text={`Loading ${studentCount} students for cohort '${cohortName}'`} />

    return (
      <Container>
        <Title>{studentCount} students in total, add more below.</Title>
        {_.map(this.props.students, (student, studentID) => 
          <CohortEditStudent
            studentID={studentID} 
            handleSubmit={this.props.updateName}
            handleDelete={this.props.deleteStudent}
            fullName={student.fullName}
            completedCount={student.completedCount}
            createdAt={student.createdAt}
            /* authorID={student.authorID} */
          />)
        }
      </Container>
    )
  }
}
CohortEditStudents.propTypes = {
  studentIDs: PropTypes.object.isRequired,
  cohortName: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    students: getStudentsOverview(state, { studentIDs: ownProps.studentIDs }),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => dispatch(fetchStudents()), 
    updateStudent: (id, fullName) => dispatch(updateStudent({ id, fullName })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CohortEditStudents)