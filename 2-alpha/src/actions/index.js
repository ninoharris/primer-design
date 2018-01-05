import axios from 'axios'

const ROOT_URL = 'http://localhost:3939'
export const ANIMATE_PREVIEW_START = 'ANIMATE_PREVIEW_START'
export const ANIMATE_PREVIEW_END = 'ANIMATE_PREVIEW_END'
export const FETCH_EXERCISES_INIT = 'FETCH_EXERCISES_INIT'
export const FETCH_EXERCISES_SUCCESS = 'FETCH_EXERCISES_SUCCESS'
export const SELECT_EXERCISE = 'SELECT_EXERCISE'

export const updateInput = (segment, userInput) => {
  return {
    type: `UPDATE_${segment}`,
    userInput,
  }
}

export const beginAnimatePreview = () => ({
  type: 'ANIMATE_PREVIEW_START',
})
export const endAnimatePreview = () => ({
  type: 'ANIMATE_PREVIEW_END',
})

export const fetchExercises = () => (dispatch, getState) => {
  dispatch({type: 'FETCH_EXERCISES_INIT' })

  axios.get(`${ROOT_URL}/exercises`)
  .then(response => response.data)
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