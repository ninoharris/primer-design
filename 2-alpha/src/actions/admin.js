import * as TYPES from './types'
import db from '../firebase/firebase'

export const addExercise = (exerciseData = {}) => (dispatch, getState) => {
  // client knows we are updating
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    payload: exerciseData,
  })

  // firebase update
  return db.ref('exercises').push(exerciseData).then(snapshot => {
    const id = snapshot.key
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      payload: exerciseData,
      id,
    })
  }).catch(err => {
    dispatch({
      type: TYPES.ADD_EXERCISE_FAIL,
      payload: { err, exerciseData }
    })
  })
}

export const updateExercise = (id, exerciseData) => (dispatch) => {
  dispatch({
    type: TYPES.UPDATE_EXERCISE_INIT,
    payload: exerciseData,
    id,
  })

  return db.ref(`exercises/${id}`).set(exerciseData).then(() => {
    dispatch({
      type: TYPES.UPDATE_EXERCISE_SUCCESS,
      payload: exerciseData,
      id,
    })
  }).catch(err => {
    dispatch({
      type: TYPES.UPDATE_EXERCISE_FAIL,
      payload: { err, exerciseData }
    })
  })
}

export const removeExercise = (id) => (dispatch) => {
  dispatch({
    type: TYPES.DELETE_EXERCISE_INIT
  })

  return db.ref(`exercises/${id}`).set(null).then(() => {
    dispatch({
      type: TYPES.DELETE_EXERCISE_SUCCESS,
      id,
    })
  }).catch((err) => {
    dispatch({
      type: TYPES.DELETE_EXERCISE_FAIL,
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