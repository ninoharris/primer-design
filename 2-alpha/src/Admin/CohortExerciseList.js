import _ from 'lodash'
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
    return (
      <ExercisesList exercisesList={_.flatMap(this.props.cohortExercises, (v, id) => ({...v, id })) } />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const cohortExercises = getExercises(ownProps.exerciseIDs)(state)
  return {
    cohortExercises
  }
}


export default connect(mapStateToProps, { fetchExercises, fetchAuthors })(CohortExerciseList)