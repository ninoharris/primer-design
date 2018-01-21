import * as TYPES from './types'
import { v4 } from 'uuid'
import fetch from 'axios'

export const addExercise = (data) => (dispatch) => {
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    id: data.id,
  })
  fetch('http://localhost:3939/exercises', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      id: data.id
    })
  })
}

export const updateExerciseFilter = (text) => {
  return {
    type: TYPES.FILTER_EXERCISES_BY_TEXT,
    payload: text,
  }
}