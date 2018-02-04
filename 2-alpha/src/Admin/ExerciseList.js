import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { exercisesByIdSelector } from '../selectors/index'
import { getFilteredSortedExercises } from '../selectors/admin'

class ExerciseList extends Component {
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
    return (
      <table className="table Admin-Exercises-List">
        <thead>
          <tr>
            <th>Exercise name</th>
            <th>Date added</th>
            <th>Last modified</th>
            <th>Author ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.exercisesList.map(exercise => this.renderExerciseItem(exercise))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state),
})

export default connect(mapStateToProps)(ExerciseList)