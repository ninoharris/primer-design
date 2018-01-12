import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchExercises } from '../../actions'

// Components
import Form from '../Form'
import EvaluationTemp from '../Evaluation/Evaluation-temp'
import Evaluation from '../Evaluation'
import Display from '../Display'
// import Modal from '../Modal';
import Options from '../Options'


class App extends Component {
  componentWillMount() {
    this.props.fetchExercises()
  }
  render() {
    if (!this.props.exercises) return (
      <div>Loading game...</div>
    )
    return (
      <div className="container-fluid mb-10 mt-10">
        <div className="row">
          <div className="Nav">
            <h3 className="mb-0">Primer Designer</h3>
          </div>
        </div>
        <div className="row">
          <div className=" Sidebar col-3">
            <Form />
            <Options />
            {/* <Modal> */}
            <Evaluation />
            {/* </Modal> */}
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
