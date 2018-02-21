import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateSortBy } from '../actions/admin'

import ExerciseListItem from './ExerciseListItem'

export class ExerciseList extends Component {
  render() {
    const { 
      exercisesList = [],
      sortByName = () => { },
      sortByCreatedAt = () => {},
      sortByLastModified = () => {},
      sortByAuthor = () => {},
      children,
     } = this.props 
    return (
      <table className="table Admin-Exercises-List">
        <thead>
          <tr>
            <th onClick={sortByName}>Exercise name</th>
            <th onClick={sortByCreatedAt}>Date added</th>
            <th onClick={sortByLastModified}>Last modified</th>
            <th onClick={sortByAuthor}>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exercisesList.length > 0 ? 
            exercisesList.map(exercise => <ExerciseListItem {...exercise} key={exercise.id} children={children} />) :
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

export default connect(null, 
  dispatch => ({
  sortByName: () => dispatch(updateSortBy('id')),
  sortByCreatedAt: () => dispatch(updateSortBy('createdAt')),
  sortByLastModified: () => dispatch(updateSortBy('lastModified')),
  sortByAuthor: () => dispatch(updateSortBy('authorName')),
})
)(ExerciseList)
