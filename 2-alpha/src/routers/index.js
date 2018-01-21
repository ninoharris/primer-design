import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Game from '../Features/Game'
import AdminHomePage from '../Features/Admin/AdminHomePage'
import AdminCreatePage from '../Features/Admin/AdminCreatePage'

const App = () => {

  return (
    <Router>
      <div className="router">
        <Switch>
          <Route path="/play/:id?" component={Game} />
          <Route exact path="/admin" component={AdminHomePage} />
          <Route path="/admin/create" component={AdminCreatePage} />
          <Redirect from="/" to="/play" />
        </Switch>
      </div>
    </Router>
  )
}

export default App