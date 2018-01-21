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
export const fetchExercises = (alwaysFetch = false) => (dispatch, getState) => {
  if(!alwaysFetch) {
    if(getState().exercisesList.length > 0) {
      dispatch({ type: TYPES.FETCHED_EXERCISES_FROM_CACHED })
      return Promise.resolve() // fetchExercises must always be then-able (eg for selectExercise after exercises are loaded)
    }
  }
  dispatch({type: TYPES.FETCH_EXERCISES_INIT })

  return axios.get(`${ROOT_URL}/exercises`)
  .then(response => response.data)
  .then(payload => {
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload
    })
  })
}

export const selectExercise = (id = null) => (dispatch, getState) => {
  if(!getState().exercisesList) return
  // if we have an id, get that exercise. otherwise pick a random id from the list.
  // TODO: replace exercisesList with exercisesLeftList
  const selectedExerciseId = id || getState().exercisesList[Math.floor(Math.random() * getState().exercisesList.length)] 
  dispatch({
    type: TYPES.SELECT_EXERCISE,
    payload: selectedExerciseId
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