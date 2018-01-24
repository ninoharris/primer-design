import _ from 'lodash'
import axios from 'axios'
import * as TYPES from './types'
import { getIsSuccessful } from '../selectors'
import db from '../firebase/firebase'


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
  .then(payload => payload.reduce((prev, curr) => ({ 
    ...prev, [curr.id]: curr
  }), {}))
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
  console.log('Selecting ex')
  const selectedExerciseId = id || getState().exercisesList[Math.floor(Math.random() * getState().exercisesList.length)] 
  dispatch({
    type: TYPES.SELECT_EXERCISE,
    payload: selectedExerciseId
  })
}

export const set100CharsWidth = (width) => ({
  type: TYPES.SET_100_CHARS_WIDTH,
  payload: width,
})


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

export const addExercise = (exerciseData = {}) => (dispatch, getState) => {
  // default values
  const {
    authorId = 'anon',
    lastModified = 0,
    createdAt = 0,
    questionPart1 = '',
    questionPart2 = '',
    haystack = '',
    vector = '',
    constructStart = 0,
    constructEnd = 0,
    vectorStart = 0,
    vectorEnd = 0,
    vectorContainsStart = true,
    vectorContainsEnd = true,
  } = exerciseData
  const exercise = { authorId, lastModified, createdAt, questionPart1, questionPart2, haystack, vector, constructStart, constructEnd, vectorStart, vectorEnd, vectorContainsStart, vectorContainsEnd }

  // client knows we are updating
  dispatch({
    type: TYPES.ADD_EXERCISE_INIT,
    payload: exercise,
  })

  // firebase
  return db.ref('exercises').push(exercise).then(snapshot => {
    const id = snapshot.key
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      payload: exercise,
    })
  }).catch(err => {
    dispatch({
      type: TYPES.ADD_EXERCISE_FAIL,
      payload: {
        err,
        exercise,
      }
    })
  })


}