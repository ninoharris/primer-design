import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminHeader from './AdminHeader'

class CohortsPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <AdminHeader title="Viewing exercises" />
        <div className="row">
          <div className="col-12">
            Cohorts page
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
}

export default connect(null)(CohortsPage)