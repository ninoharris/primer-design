import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import LoginPage from '../Admin/LoginPage'
import AdminHomePage from '../Admin/AdminHomePage'
import AdminEditPage from '../Admin/AdminEditPage'
import AdminCreatePage from '../Admin/AdminCreatePage'

const adminRouter = () => (
  <Switch>
    <Route exact path="/admin" component={LoginPage} />
    <Route exact path="/admin/dashboard" component={AdminHomePage} />
    <Route exact path="/admin/create" component={AdminCreatePage} />
    <Route exact path="/admin/edit/:id" component={AdminEditPage} />
  </Switch>
)

export default adminRouter