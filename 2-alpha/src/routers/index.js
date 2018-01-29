import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Game from '../Features/Game'
import AdminRouter from './admin'

import MultilineWidth from '../components/MultilineWidth' // used throughout admin and user-facing for width of 100 chars.

const App = () => {
  return (
    <Router>
      <div className="router">
        <MultilineWidth />
        <Switch>
          <Route path="/play/:id?" component={Game} />
          <Route path="/admin" component={AdminRouter} />
          <Redirect from="/" to="/play" />
        </Switch>
      </div>
    </Router>
  )
}

export default App