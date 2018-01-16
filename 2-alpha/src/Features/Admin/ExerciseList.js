import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { exercisesListSelector, exercisesByIdSelector } from '../../selectors/index'
import { exercisesList, exercisesById } from '../../reducers/exercises';


class ExerciseList extends Component {
  renderExerciseItem = (exercise) => {
    return (
      <tr key={exercise.id}>
        <td>{exercise.question.part1}</td>
        <td>{new Date(exercise.createdAt).toLocaleDateString()}</td>
        <td>{new Date(exercise.lastModified).toLocaleDateString()}</td>
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
      <table className="table">
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
          {this.props.exercisesList.map(
            (ID) => this.renderExerciseItem(this.props.exercisesById[ID]))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  exercisesById: exercisesByIdSelector(state),
  exercisesList: exercisesListSelector(state),
})

export default connect(mapStateToProps)(ExerciseList)