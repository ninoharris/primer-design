import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AdminHeader from './AdminHeader'
import MainExerciseList from './MainExerciseList'
import withLoading from '../components/withLoading'
import FilterExercises from './FilterExercises'

const Container = styled.div`
`

export class AdminExercisesPage extends Component {
  render() {
    return (
      <Container>
        <AdminHeader title="Exercises database" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <FilterExercises />
            </div>
            <div className="col-12">
              <MainExerciseList />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default AdminExercisesPage