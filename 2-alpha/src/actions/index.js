import _ from 'lodash'
import db from '../firebase/firebase'
import * as TYPES from './types'
import { getIsSuccessful } from '../selectors/evaluations'
import * as selectors from '../selectors'
import { pickRandomFromArray } from '../api'
export * from './troubleshooter'


export const fetchStudent = (id) => (dispatch) => { // used for /play
  dispatch({ type: TYPES.FETCH_STUDENT_INIT, id })

  return db.ref(`students/${id}`).once('value').then(snapshot => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_STUDENT_SUCCESS,
      id,
      payload,
    })
    return payload
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

export const fetchAllExercises = () => (dispatch, getState) => {
  dispatch({ type: TYPES.FETCH_EXERCISES_INIT })

  return db.ref('exercises').once('value')
    .then((snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload,
    })
  })
}

export const fetchExercises = (exerciseIDs = {}) => (dispatch) => {
  window.alert('USE FETCHEXERCISES WITH CAUTION')
  dispatch({ type: TYPES.FETCH_EXERCISES_INIT, exerciseIDs })
  console.log('fetchEx inside: ', exerciseIDs)
  return Promise.all(_.flatMap(exerciseIDs, (v, id) => {
    return db.ref(`exercises/${id}`).once('value').then(snapshot => ({ ...snapshot.val(), id }))
  })).then((payload) => {
    payload = { ..._.keyBy(payload, (v, k) => k) } // turn array of promises back into an object
    dispatch({
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload,
      notAll: true,
    })
    return Promise.resolve()
  })
}

export const fetchCohortExerciseIDs = (cohortID) => (dispatch) => {
  dispatch({ type: TYPES.FETCH_COHORT_STUDENT_INTERFACE_INIT, cohortID })

  return db.ref(`cohorts/${cohortID}/exerciseIDs`).once('value')
    .then((snapshot) => {
      dispatch({
        type: TYPES.FETCH_COHORT_STUDENT_INTERFACE_SUCCESS,
        payload: snapshot.val(),
      })
      return snapshot
  })
}

export const selectExercise = (id = null) => (dispatch, getState) => {
  const state = getState()
  const exercisesList = selectors.exercisesListSelector(state)
  // if we have an id, get that exercise. otherwise pick a random id from the list.
  if (id !== null) {
    if (exercisesList.includes(id)) {
      dispatch({
        type: TYPES.SELECT_EXERCISE,
        payload: id,
      })
      dispatch({
        type: TYPES.NOT_COUNTING_ATTEMPT,
        payload: true,
      })
    } else {
      dispatch({ types: TYPES.EXERCISE_DOESNT_EXIST })
    }
  } else {
    const unattemptedExercisesList = selectors.getUnattemptedExercisesList(state)
    const selectedExerciseId = unattemptedExercisesList.length > 0 ?
      pickRandomFromArray(unattemptedExercisesList) :
      pickRandomFromArray(exercisesList) // all possible exercises completed

    dispatch({
      type: TYPES.SELECT_EXERCISE,
      payload: selectedExerciseId
    })
  }
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



export const editingGameInput = (input, isEditing) => ({
  type: TYPES.EDITING_GAME_INPUT,
  input,
  isEditing,
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

export const sendAdviceMessage = (studentID, exerciseID) => (message) => (dispatch) => {
  dispatch({
    type: TYPES.SEND_ADVICE_MESSAGE_INIT,
    studentID,
    exerciseID,
    message,
  })
}

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