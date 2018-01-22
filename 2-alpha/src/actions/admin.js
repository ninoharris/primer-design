import * as TYPES from './types'
import { v4 } from 'uuid'
import fetch from 'axios'

export const addExercise = ({ id, payload }) => (dispatch) => {
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    id,
  })
  fetch(`http://localhost:3939/exercises`, {
    method: 'POST',
    data: payload
  }).then(() => {
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      id,
    })
  })
}

export const updateExerciseFilter = (text) => {
  return {
    type: TYPES.FILTER_EXERCISES_BY_TEXT,
    payload: text,
  }
}