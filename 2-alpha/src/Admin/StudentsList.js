import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import { getCohortStudents } from '../selectors/admin'

const StudentListItem = ({ studentID, fullName, handleClick }) => {
  return (
    <li>
      {fullName}
    </li>
  )
}

const StudentList = ({ students = {}, handleClick = () => {}}) => {
  return (
    <ul className="list-group">
      {students.map((student) => <StudentListItem {...student} />)}
    </ul>
  )
}

const mapStateToProps = (state, ownProps) => {
  const students = _.mapValues(getCohortStudents(state, ownProps), (v, k) => ({ ...v, id: k }))
  console.log(getCohortStudents(state, ownProps))
  return {
    students: _.flatMap(students)
  }
}

export default connect(mapStateToProps, { })(StudentList)