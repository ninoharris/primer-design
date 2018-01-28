import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AdminHomePage from '../Admin/AdminHomePage'
import AdminEditPage from '../Admin/AdminEditPage'
import AdminCreatePage from '../Admin/AdminCreatePage'

const adminRouter = () => (
  <Switch>
    <Route exact path="/admin" component={AdminHomePage} />
    <Route exact path="/admin/create" component={AdminCreatePage} />
    <Route exact path="/admin/edit/:id" component={AdminEditPage} />
  </Switch>
)

export default adminRouter