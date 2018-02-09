import React from 'react'
import { Route, Switch, Redirect, } from 'react-router-dom'

import Header from '../components/Header';
import TutorialLink from './TutorialLink'

// content
import Welcome from './content/Welcome'
import SelectingForwardPrimerVector from './content/SelectingForwardPrimerVector'


const TutorialPage = () => (
  <div className="Tutorial-Page">
    <Header />
    <div className="container-fluid">
      <div className="row">
        <div className="Sidebar col-4">
          <nav>
            <ol className="list-group">
              <TutorialLink tutorialNumber="0.1" to="/tutorials/welcome">Start here</TutorialLink>
              <TutorialLink tutorialNumber="1.0" to="/tutorials/selecting-forward-primer-vector">Forward primer: selecting RE sites</TutorialLink>
              <TutorialLink tutorialNumber="1.1" to="/tutorials/selecting-reverse-primer-vector">Reverse primer: selecting RE sites</TutorialLink>
            </ol>
          </nav>
        </div>
        <div className="Main col-8">
          <Switch>
            <Redirect exact path="/tutorials" to="/tutorials/welcome" />
            <Route path="/tutorials/welcome" component={Welcome} />
            <Route path="/tutorials/selecting-forward-primer-vector" component={SelectingForwardPrimerVector} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
)

export default TutorialPage