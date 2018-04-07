import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { transparentize } from 'polished'
import { fetchAllExercises, selectExercise } from '../../actions'
import { currentExerciseID } from '../../selectors'

// Components
import Form from '../Form'
import EvaluationTemp from '../Evaluation/Evaluation-temp'
import Evaluation from '../Evaluation'
import Display from '../Display'
import Modals from '../modals'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestrictionSitesPreview from '../../components/RestrictionSitesPreview'

const Container = styled.div`
  display: flex;
  align-items: stretch;
`
const VerticalContainer = Container.extend`
  flex-direction: column;
  min-height: 100vh;
`

const Sidebar = styled.div`
  background-color: ${p => transparentize(0.7, p.theme.white)};
  width: ${p => p.theme.sidebarWidth};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Main = styled.div`
  flex: 1;
`

const theme = {
  pMarginBottom: 0,
}

class App extends Component {
  componentDidMount() {
    this.props.fetchAllExercises().then(() => {
      const { id } = this.props.match.params
      this.props.selectExercise(id) // TODO: when deploying, remove id bit. let it pick it randomly
    })
  }
  render() {
    console.log('current ex:', this.props.currentExercise)
    if (!this.props.currentExercise) return (
      <div className="main-loading">Selecting exercise...</div>
    )
    return (
      <VerticalContainer>
        <Modals />
        <Header />
        <Container>
          <ThemeProvider theme={theme}>
            <Sidebar>
              <Form />
              <Evaluation />
              {/* <RestrictionSitesPreview /> */}
            </Sidebar>
          </ThemeProvider>
          <Main>
            <Display />
            <EvaluationTemp />
          </Main>
        </Container>
        <Footer />
      </VerticalContainer>
    )
  }
}

// TODO: ADD IN FOOTER

const mapStateToProps = (state) => ({ currentExercise: currentExerciseID(state) })

export default connect(mapStateToProps, { fetchAllExercises, selectExercise })(App)
