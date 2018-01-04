import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import ExerciseEditor from './ExerciseEditor'
import ExerciseListContainer from './ExercisesList'
import UpdateExerciseContainer from './UpdateExerciseContainer'
import axios from 'axios'

import style from './style'

class ExerciseContainer extends Component {
  handleExerciseSubmit = (data, id) => {
    axios.post('http://localhost:3005/exercise', data).then(res => {
      const id = res.data._id
      this.props.history.push(`/exercise/${id}`);
    })
  }
  render() {
    return (
      <div style={style.exerciseContainer}>
        <nav>
          <Link to="/">{`<< Back to homepage`}</Link>
        </nav>
        <Route exact path="/" component={ExerciseListContainer} />
        <Route exact path="/create" render={() => <ExerciseEditor onSubmit={this.handleExerciseSubmit} />} />
        <Route path="/exercise/:_id" component={UpdateExerciseContainer} />
      </div>
    )
  }
}

export default withRouter(ExerciseContainer)