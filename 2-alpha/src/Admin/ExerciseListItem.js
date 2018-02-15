import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ExerciseListItem = ({
  id,
  createdAt,
  lastModified,
  authorName,
  questionPart1,
}) => (      
  <tr key={id}>
    <td>
      {questionPart1}
      <small className="ID"><a target="_blank" href={'/play/' + id}>{id} - View demo</a></small>
    </td>
    <td className="small">{moment(createdAt).format("ddd, Do MMM YY")}</td>
    <td className="small">{moment(lastModified).format("ddd, Do MMM YY")}</td>
    <td>{authorName}</td>
    <td>
      <Link to={`/admin/edit/${id}`}>
        <button className="btn btn-primary">Edit exercise</button>
      </Link>
    </td>
  </tr>
)

ExerciseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  questionPart1: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  lastModified: PropTypes.number.isRequired,
}

export default ExerciseListItem