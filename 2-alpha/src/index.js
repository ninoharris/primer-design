// import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider, connect } from 'react-redux'
import configureStore from './configureStore'
import { fetchExercises } from './actions'

// Components
import Form from './components/Form'
import Evaluation from './components/Evaluation'
import Display from './components/Display'


class App extends Component {
  componentWillMount() {
    this.props.fetchExercises()
  }
  render() {
    if(!this.props.exercises) return (
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
            <Evaluation />
          </div>
          <div className="Display col-8">
            <Display />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({exercisesById }) => ({ exercises: exercisesById })

App = connect(mapStateToProps, {fetchExercises})(App)

ReactDOM.render(
  <Provider store={configureStore()}><App /></Provider>, 
  document.getElementById('root'));
registerServiceWorker();
