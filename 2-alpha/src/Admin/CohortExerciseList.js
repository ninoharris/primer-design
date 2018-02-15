import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExercisesList from './ExercisesList'

import { fetchExercises } from '../actions'
import { fetchAuthors } from '../actions/admin'
import { getExercises } from '../selectors/admin';

export class CohortExerciseList extends Component {
  state = {
    ready: false
  }
  componentDidMount () {
    Promise.all([
      this.props.fetchExercises(this.props.exerciseIDs),
      this.props.fetchAuthors(),
    ]).then(() => this.setState({ ready: true }))
  }
  render() {
    if(!this.state.ready) return null
    console.log('exercises list:', this.props.exercisesList)
    return (
      <ExercisesList exercisesList={this.props.exercisesList} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const exercisesList = getExercises(ownProps.exerciseIDs)(state)
  return {
    exercisesList
  }
}


export default connect(mapStateToProps, { fetchExercises, fetchAuthors })(CohortExerciseList)