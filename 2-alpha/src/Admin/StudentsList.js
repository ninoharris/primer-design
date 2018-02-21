import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const StudentListItem = ({ studentID, fullName, handleClick, children }) => {
  return (
    <li>
      {fullName}
      {React.Children.map(children, (child) => 
    </li>
  )
}

const StudentList = ({ students = {}, handleClick = () => {}, children}) => {
  return (
    <ul className="list-group">
      {_.flatMap(students, (student, key) => <StudentListItem key={key} {...student}>{children}</StudentListItem>)}
    </ul>
  )
}
StudentList.propTypes = {
  students: PropTypes.object.isRequired,
}

export default connect(null, { })(StudentList)