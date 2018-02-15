import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllExercises, selectExercise } from '../../actions'
import { currentExerciseSelector } from '../../selectors'

// Components
import Form from '../Form'
import EvaluationTemp from '../Evaluation/Evaluation-temp'
import Evaluation from '../Evaluation'
import Display from '../Display'
import Options from '../Options'
import Modals from '../modals'
import Header from '../../components/Header'
import RestrictionSitesPreview from '../../components/RestrictionSitesPreview'


class App extends Component {
  componentWillMount() {
    this.props.fetchAllExercises().then(() => {
      this.props.selectExercise(this.props.match.params.id) // TODO: when deploying, remove id bit. let it pick it randomly
    })
  }
  render() {
    console.log('current ex:', this.props.currentExercise)
    if (!this.props.currentExercise) return (
      <div className="main-loading">Loading game...</div>
    )
    return (
      <div className="container-fluid mb-10 mt-10 Game">
        <Modals />
        <Header />
        <div className="row">
          <div className=" Sidebar col-3">
            <Form />
            <Options />
            <Evaluation />
            <RestrictionSitesPreview />
          </div>
          <div className="Display col-8">
            <Display />
            <EvaluationTemp />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ currentExercise: currentExerciseSelector(state) })

export default connect(mapStateToProps, { fetchAllExercises, selectExercise })(App)
