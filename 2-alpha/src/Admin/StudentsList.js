import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const StudentListItem = ({ studentID, fullName, handleClick, children }) => {
  return (
    <li>
      {studentID} - 
      {fullName} - 
      {React.Children.map(children, (child) => React.cloneElement(child, { studentID }))}
    </li>
  )
}

const StudentList = ({ students = {}, handleClick = () => {}, children}) => {
  console.log('studentList:', students)
  return (
    <ul className="list-group">
      {_.flatMap(students, (student, key) => <StudentListItem key={key} {...student}>{children}</StudentListItem>)}
    </ul>
  )
}
StudentList.propTypes = {
  students: PropTypes.object.isRequired,
}

export default StudentList