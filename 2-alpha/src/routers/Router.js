import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import PlayRouter from './PlayRouter'
import AdminRouter from './AdminRouter'

import MultilineWidth from '../components/MultilineWidth' // used throughout admin and user-facing for width of 100 chars.
import TutorialPage from '../Tutorials/TutorialPage';

export const history = createHistory()

const App = () => {
  return (
    <Router history={history}>
      <div className="router">
        <MultilineWidth />
        <Switch>
          <Route path="/play" component={PlayRouter} />
          <Route path="/admin" component={AdminRouter} />
          <Route path="/tutorials" component={TutorialPage} />
          <Redirect from="/" to="/play" />
        </Switch>
      </div>
    </Router>
  )
}

export default App