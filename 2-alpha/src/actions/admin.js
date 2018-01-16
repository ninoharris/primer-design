import * as TYPES from './types'
import { v4 } from 'uuid'
import fetch from 'axios'

export const addExercise = (data) => (dispatch) => {
  const id = v4()
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    id,
  })
  fetch('http://server', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      id
    })
  })
}