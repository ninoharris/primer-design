import React from 'react'

import AdminHeader from './AdminHeader'
import CohortsList from './CohortsList'

const CohortsPage = () => (
  <div className="container-fluid">
    <AdminHeader title="Viewing cohorts" />
    <div className="row">
      {/* TODO: general cohorts dashboard overview (number of cohorts), possibly the most recent viewed one, with a dashboard of that? */}
      {/* TODO: add cohort search bar here */}
      <div className="col-12">
        <CohortsList />
      </div>
    </div>
  </div>
) 

export default CohortsPage