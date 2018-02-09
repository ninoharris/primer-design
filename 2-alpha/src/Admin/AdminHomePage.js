import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import ExerciseList from './ExerciseList'
import withLoading from '../components/withLoading'
import FilterExercises from './FilterExercises'

export class AdminHomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header title="Viewing exercises" />
        <div className="row">
          <div className="col-12">
            <FilterExercises />
          </div>
          <div className="col-12">
            <ExerciseList />
          </div>
        </div>
      </div>
    )
  }
}

const AdminHomePageWithLoading = withLoading(true, true)(AdminHomePage, true)

export default connect()(AdminHomePageWithLoading)