import React from 'react'
import { Route, Switch, Redirect, } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header';
import TutorialLink from './TutorialLink'

// content
import content from './content'
import ContentProvider from './ContentProvider'


const Container = styled.div`
`

const TutorialPage = () => {

  const navigation = []
  for(let tutorial in content) {
    navigation.push(<TutorialLink to={`/tutorials/${tutorial}`}>{content[tutorial].title}</TutorialLink>)
  }
  return (
    <Container>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="Sidebar col-4">
            <nav>
              <ol className="list-group">
                {navigation}
              </ol>
            </nav>
          </div>
          <div className="Main col-8">
            <Switch>
              <Redirect exact path="/tutorials" to="/tutorials/welcome" />
              <Route path="/tutorials/:url" component={ContentProvider} />
            </Switch>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TutorialPage