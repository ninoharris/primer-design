import axios from 'axios'
import * as TYPES from './types'
import { getIsSuccessful } from '../selectors'


const ROOT_URL = 'http://localhost:3939'

export * from './troubleshooter'

export const updateInput = (segment, userInput) => {
  return {
    type: `UPDATE_${segment}`,
    userInput,
  }
}

export const beginAnimatePreview = () => ({
  type: TYPES.ANIMATE_PREVIEW_START,
})
export const endAnimatePreview = () => ({
  type: TYPES.ANIMATE_PREVIEW_END,
})

export const fetchExercises = () => (dispatch, getState) => {
  dispatch({type: TYPES.FETCH_EXERCISES_INIT })

  axios.get(`${ROOT_URL}/exercises`)
  .then(response => response.data)
  .then(payload => {
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload
    })
  })
  .then(() => {
    const selectedExerciseId = getState().exercisesList[0] // just pick the first one off
    dispatch({
      type: TYPES.SELECT_EXERCISE,
      payload: selectedExerciseId
    })
  })
}

export const doShowCodons = (on) => ({
  type: TYPES.TOGGLE_CODONS,
  payload: on
})

export const attemptCompletion = () => (dispatch, getState) => {
  if(getIsSuccessful(getState())) {
    dispatch({
      type: TYPES.EXERCISE_SUCCESS,
      id: getState().currentExercise
    })
  } else {
    dispatch({
      type: TYPES.EXERCISE_FAIL
    })
  }
}

export const newExercise = () => (dispatch, getState) => {
  dispatch({
    type: TYPES.NEW_EXERCISE
  })
}