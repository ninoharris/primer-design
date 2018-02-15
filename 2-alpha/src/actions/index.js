import _ from 'lodash'
import db from '../firebase/firebase'
import * as TYPES from './types'
import { getIsSuccessful } from '../selectors/evaluations'
export * from './troubleshooter'

export const fetchStudent = (id) => (dispatch) => { // used for /play
  dispatch({ type: TYPES.FETCH_STUDENT_INIT })

  return db.ref(`students/${id}`).once('value').then(snapshot => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_STUDENT_SUCCESS,
      id,
      payload,
    })
  })
}

export const checkStudentExists = (id) => (dispatch) => {
  dispatch({ type: TYPES.CHECK_STUDENT_EXISTS, id })

  return db.ref(`students/${id}`).once('value').then((snapshot) => {
    return snapshot.exists() ? Promise.resolve({ id, cohortID: snapshot.val().cohortID }) : Promise.reject('Student does not exist!')
  })
}

export const updateCurrentStudentID = (id) => (dispatch) => {
  dispatch({ type: TYPES.UPDATE_CURRENT_STUDENT_ID, id })
}

export const fetchAllExercises = (alwaysFetch = false) => (dispatch, getState) => {
  if (!alwaysFetch) {
    if (getState().exercisesList.length > 0) {
      dispatch({ type: TYPES.FETCHED_EXERCISES_FROM_CACHED }) // this action does nothing. Just serves to notify devTools when developing.
      return Promise.resolve() // fetchAllExercises must always be then-able (eg for selectExercise after exercises are loaded)
    }
  }
  dispatch({ type: TYPES.FETCH_EXERCISES_INIT })

  return db.ref('exercises').once('value', (snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload,
    })
  })
}

export const fetchExercises = (exerciseIDs = {}) => (dispatch) => {
  dispatch({ type: TYPES.FETCH_EXERCISES_INIT, exerciseIDs })
  console.log('fetchEx inside: ', exerciseIDs)
  return Promise.all(_.flatMap(exerciseIDs, (v, id) => {
    return db.ref(`exercises/${id}`).once('value').then(snapshot => ({ ...snapshot.val(), id }))
  })).then((payload) => {
    payload = _.keyBy(payload, (v, k) => k)
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload
    })
    return Promise.resolve()
  })
}

export const fetchCohortExerciseIDs = (cohortID) => (dispatch) => {
  dispatch({ type: TYPES.FETCH_COHORT_STUDENT_INTERFACE_INIT, cohortID })

  return db.ref(`cohorts/${cohortID}`).once('value')
    .then((snapshot) => {
      const cohortName = snapshot.child('cohortName')
      const exerciseIDs = snapshot.child('exerciseIDs')
      const payload = { exerciseIDs, cohortName }
      dispatch({
        type: TYPES.FETCH_COHORT_STUDENT_INTERFACE_SUCCESS,
        payload,
      })
      return exerciseIDs
  })
}

export const selectExercise = (id = null) => (dispatch, getState) => {
  if (!getState().exercisesList) return
  // if we have an id, get that exercise. otherwise pick a random id from the list.
  // TODO: replace exercisesList with exercisesLeftList
  const selectedExerciseId = id || getState().exercisesList[Math.floor(Math.random() * getState().exercisesList.length)]
  dispatch({
    type: TYPES.SELECT_EXERCISE,
    payload: selectedExerciseId
  })
}

export const newExercise = () => (dispatch, getState) => {
  // Todo: check which exercises the user hasn't done yet, and pick a random one from that list.
  dispatch({
    type: TYPES.NEW_EXERCISE
  })
}

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







export const setMultilineWidth = (width) => ({
  type: TYPES.SET_MULTILINE_WIDTH,
  payload: width,
})


export const doShowCodons = (on) => ({
  type: TYPES.TOGGLE_CODONS,
  payload: on
})

export const doShowAdminEvaluation = (on) => ({
  type: TYPES.TOGGLE_ADMIN_EVALUATION,
  payload: on,
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