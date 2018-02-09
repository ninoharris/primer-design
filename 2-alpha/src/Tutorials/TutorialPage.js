import React from 'react'
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom'

import Welcome from '../Tutorials/Welcome'
import SelectingForwardPrimerVector from '../Tutorials/SelectingForwardPrimerVector'
import Header from '../components/Header';


const TutorialPage = () => (
  <div className="Tutorial-Page">
    <Header />
    <div className="container-fluid">
      <div className="Sidebar">
        <nav>
          <ol className="list-group">
            <NavLink to="/tutorials/welcome">Start here</NavLink>
            <NavLink to="/tutorials/selecting-forward-primer-vector">Forward primer: selecting RE sites</NavLink>
            <NavLink to="/tutorials/selecting-forward-primer-vector">Reverse primer: selecting RE sites</NavLink>
          </ol>
        </nav>
      </div>
      <div className="Main">
        <Switch>
          <Redirect exact path="/tutorials" to="/tutorials/welcome" />
          <Route path="tutorials/welcome" component={Welcome} />
          <Route path="/tutorials/selecting-forward-primer-vector" component={SelectingForwardPrimerVector} />
        </Switch>
      </div>
    </div>
  </div>
)

export default TutorialPage