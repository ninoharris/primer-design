import React from 'react'
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom'

import Header from '../components/Header';
import TutorialLink from './TutorialLink'

import Welcome from '../Tutorials/Welcome'
import SelectingForwardPrimerVector from '../Tutorials/SelectingForwardPrimerVector'


const TutorialPage = () => (
  <div className="Tutorial-Page">
    <Header />
    <div className="container-fluid">
      <div className="row">
        <div className="Sidebar col-4">
          <nav>
            <ol className="list-group">
              <TutorialLink to="/tutorials/welcome">Start here</TutorialLink>
              <TutorialLink to="/tutorials/selecting-forward-primer-vector">Forward primer: selecting RE sites</TutorialLink>
              <TutorialLink to="/tutorials/selecting-reverse-primer-vector">Reverse primer: selecting RE sites</TutorialLink>
            </ol>
          </nav>
        </div>
        <div className="Main col-8">
          <Switch>
            <Redirect exact path="/tutorials" to="/tutorials/welcome" />
            <Route path="tutorials/welcome" component={Welcome} />
            <Route path="/tutorials/selecting-forward-primer-vector" component={SelectingForwardPrimerVector} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
)

export default TutorialPage