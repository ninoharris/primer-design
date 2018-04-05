import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateSortBy } from '../actions/admin'

import ExerciseListItem from './ExerciseListItem'

export class ExerciseList extends Component {
  render() {
    const { 
      exercisesList = [],
      children,
     } = this.props 
    return (
      <table className="table Admin-Exercises-List">
        <thead>
          <tr>
            <th onClick={() => updateSortBy('id')}>Exercise name</th>
            <th onClick={() => updateSortBy('createdAt')}>Date added</th>
            <th onClick={() => updateSortBy('lastModified')}>Last modified</th>
            <th onClick={() => updateSortBy('authorName')}>Author</th>
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

export default connect(null, {
  updateSortBy
})(ExerciseList)
