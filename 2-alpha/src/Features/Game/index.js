import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchExercises, showModal, hideModal } from '../../actions'

// Components
import Form from '../Form'
import EvaluationTemp from '../Evaluation/Evaluation-temp'
import Evaluation from '../Evaluation'
import Display from '../Display'
// import Modal from '../../components/Modal';
import Options from '../Options'
import Modals from '../modals'


class App extends Component {
  componentWillMount() {
    this.props.fetchExercises()
  }
  render() {
    if (!this.props.exercises) return (
      <div className="main-loading">Loading game...</div>
    )
    return (
      <div className="container-fluid mb-10 mt-10">
        <Modals />
        <div className="row">
          <div className="Nav">
            <div className="Logo">
              <h3 className="mb-0">Primer Designer</h3>
            </div>
            <div>
              <button onClick={() => {}} className="btn btn-info" /* TODO: update with tutorial pages */>
                See tutorial
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" Sidebar col-3">
            <Form />
            <Options />
            <Evaluation />
            
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

const mapStateToProps = ({ exercisesById }) => ({ exercises: exercisesById })

export default connect(mapStateToProps, { fetchExercises })(App)
