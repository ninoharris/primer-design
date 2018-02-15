import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminHeader from './AdminHeader'
import MainExerciseList from './MainExerciseList'
import withLoading from '../components/withLoading'
import FilterExercises from './FilterExercises'

export class AdminHomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <AdminHeader title="Viewing exercises" />
        <div className="row">
          <div className="col-12">
            <FilterExercises />
          </div>
          <div className="col-12">
            <MainExerciseList />
          </div>
        </div>
      </div>
    )
  }
}

const AdminHomePageWithLoading = withLoading(true, true)(AdminHomePage, true)

export default connect()(AdminHomePageWithLoading)