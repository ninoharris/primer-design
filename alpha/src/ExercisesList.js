import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Exercise from './Exercise'
import style from './style'

class ExercisesListContainer extends React.Component {
  state = {
    data: []
  }
  loadServerExercises = () => {
    axios.get('http://localhost:3005/exercise').then(response => {
      this.setState({ data: response.data })
    })
  }
  deleteExercise = (id) => {
    axios.delete('http://localhost:3005/exercise/' + id).then(() => {
      this.loadServerExercises()
    })
  }
  componentDidMount() {
    this.loadServerExercises()
  }
  render() {
    return (
      <div>
        <h2>Primer Design Exercises</h2>
        <ExercisesList data={this.state.data} onDelete={this.deleteExercise} />
        <Link to="/create"><strong>Create new exercise</strong></Link>
      </div>
    )
  }
}

const ExercisesList = ({ data, onDelete}) => {
  let exerciseNodes = data.map(exercise => {
    return <Exercise
      key={exercise._id}
      {...exercise}
      onDelete={onDelete}
    />
  })
  return (
    <div style={style.exercisesList}>
      <h2>Exercises available: </h2>
      {exerciseNodes}
    </div>
  )
}


export default ExercisesListContainer