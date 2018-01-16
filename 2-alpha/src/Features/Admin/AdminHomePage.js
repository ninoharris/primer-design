import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExerciseList from './ExerciseList'
import withLoading from '../../components/withLoading'

class AdminHomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="Nav">
            <div className="Logo">
              <h4>Primer design - admin</h4>
            </div>
            <div>
              <button className="btn btn-success mr-3" onClick={() => {}}>Add new exercise</button>
              <button className="btn btn-info mr-3" onClick={() => { }}>View students</button>
              <button className="btn btn-warning mr-3" onClick={() => { }}>Log out</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ExerciseList />
          </div>
        </div>
      </div>
    )
  }
}

AdminHomePage = withLoading(AdminHomePage, true)

export default connect()(AdminHomePage)