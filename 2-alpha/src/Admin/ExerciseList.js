import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { updateSortBy } from '../actions/admin'
import { getFilteredSortedExercises } from '../selectors/admin'

export class ExerciseList extends Component {
  renderExerciseItem = (exercise) => {
    return (
      <tr key={exercise.id}>
        <td>
          {exercise.questionPart1}
          <small className="ID">{exercise.id}</small>
        </td>
        <td className="small">{moment(exercise.createdAt).format("ddd, Do MMM YY")}</td>
        <td className="small">{moment(exercise.lastModified).format("ddd, Do MMM YY")}</td>
        <td>{exercise.authorId}</td>
        <td>
          <Link to={`/admin/edit/${exercise.id}`}>
            <button className="btn btn-primary">Edit exercise</button>
          </Link>
        </td>
      </tr>
    )
  }
  render() {
    const { 
      exercisesList = [],
      sortByName = () => { },
      sortByCreatedAt = () => {},
      sortByLastModified = () => {},
      sortByAuthorId = () => {},
     } = this.props 
    return (
      <table className="table Admin-Exercises-List">
        <thead>
          <tr>
            <th onClick={sortByName}>Exercise name</th>
            <th onClick={sortByCreatedAt}>Date added</th>
            <th onClick={sortByLastModified}>Last modified</th>
            <th onClick={sortByAuthorId}>Author ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exercisesList.length > 0 ? 
            exercisesList.map(exercise => this.renderExerciseItem(exercise)) :
            <tr><td>No exercises found...</td></tr>
          }
        </tbody>
      </table>
    )
  }
}

ExerciseList.propTypes = {
  exercisesList: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state)
})

export default connect(mapStateToProps, dispatch => ({
  sortByName: () => dispatch(updateSortBy('id')),
  sortByCreatedAt: () => dispatch(updateSortBy('createdAt')),
  sortByLastModified: () => dispatch(updateSortBy('lastModified')),
  sortByAuthorId: () => dispatch(updateSortBy('authorId')),
}))(ExerciseList)