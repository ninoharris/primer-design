import _ from 'lodash'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3939'

export const updateInput = (segment, userInput) => {
  return {
    type: `UPDATE_${segment}`,
    userInput,
  }
}

export const beginAnimatePreview = () => (dispatch) => {
  dispatch({
    type: 'ANIMATE_PREVIEW_START',
  })
  window.setTimeout(() => dispatch({
    type: 'ANIMATE_PREVIEW_END'
  }), 4000)
}

export const fetchExercises = () => (dispatch, getState) => {
  dispatch({type: 'FETCH_EXERCISES_INIT' })

  axios.get(`${ROOT_URL}/exercises`)
  .then(response => console.log(response.data) || response.data)
  .then(payload => {
    dispatch({
      type: 'FETCH_EXERCISES_SUCCESS',
      payload
    })
  })
  .then(() => {
    const selectedExerciseId = getState().exercisesList[0] // just pick the first one off
    dispatch({
      type: 'SELECT_EXERCISE',
      payload: selectedExerciseId
    })
  })
}