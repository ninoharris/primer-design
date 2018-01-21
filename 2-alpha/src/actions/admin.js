import * as TYPES from './types'
import { v4 } from 'uuid'
import fetch from 'axios'

export const addExercise = (data) => (dispatch) => {
  const id = v4()
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    id,
  })
  fetch('https://server', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      id
    })
  })
}

export const updateExerciseFilter = (text) => {
  return {
    type: TYPES.FILTER_EXERCISES_BY_TEXT,
    payload: text,
  }
}