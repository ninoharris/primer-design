import _ from 'lodash'
import db from '../firebase/firebase'
import * as TYPES from './types'
import { getExerciseComplete, getPhase1Ready } from '../selectors/evaluations'
import * as selectors from '../selectors'
import { pickRandomFromArray, firebasePathExists } from '../api'
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
    const availableExercisesList = selectors.getAvailableExercisesList(state)

    if(availableExercisesList.length === 0) {
      dispatch({
        types: TYPES.GAME_COMPLETED,
        val: true,
      })
    }

    const selectedExerciseId = availableExercisesList.length > 0 ?
      pickRandomFromArray(availableExercisesList) :
      pickRandomFromArray(exercisesList) // all possible exercises completed

    dispatch({
      type: TYPES.SELECT_EXERCISE,
      payload: selectedExerciseId
    })
  }
}


export const updateInput = (segment, userInput) => dispatch => {
  dispatch({
    type: `UPDATE_${segment}`,
    userInput,
  })
  removeFailMessageAfterInputChange(dispatch)
}

export const hoverInput = (segment, val = false) => ({
  type: `HOVER_${segment}`,
  val,
})

export const updateInputs = (inputs = {}) => dispatch => {
  _.each(inputs, (val, key) => dispatch(updateInput(key, val)))
}

export const removeFailMessageAfterInputChange = (dispatch) => _.debounce(
  () => dispatch({
    type: TYPES.EXERCISE_FAIL,
    val: true,
  }), 3000 // hide message after three seconds upon typing
)

export const beginAnimatePreview = () => ({
  type: TYPES.ANIMATE_PREVIEW_START,
})
export const endAnimatePreview = () => ({
  type: TYPES.ANIMATE_PREVIEW_END,
})



export const editingGameInput = (input, isEditing) => ({
  type: TYPES.EDITING_GAME_INPUT,
  isEditing: isEditing ? input : null,
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

export const sendAdviceMessage = (studentID, exerciseID, cohortID) => (message) => (dispatch) => {
  dispatch({
    type: TYPES.SEND_ADVICE_MESSAGE_INIT,
    studentID,
    exerciseID,
    cohortID,
    message,
  })
  let newKey
  // check if student doesn't already exist
  return firebasePathExists(db, `students/${studentID}/`)
    .then(() => {
      newKey = db.ref(`attempts`).push().key // get the key of the new attempt
    
      return db.ref().update({
        // [`students/${studentID}/attempts/${newKey}`]: true,
        [`students/${studentID}/exercises/${exerciseID}/attempts/${newKey}`]: true,
        [`attemptsByID/${newKey}`]: { ...message, exerciseID, studentID, cohortID }
      })
    })
    .then(() => dispatch({
      type: TYPES.SEND_ADVICE_MESSAGE_SUCCESS,
      studentID,
      exerciseID,
      cohortID,
      message,
      newKey,
    }))
    .catch(err => {
      dispatch({
        type: TYPES.SEND_ADVICE_MESSAGE_FAIL,
        message,
        err,
      })
      return Promise.reject(err)
    })
}

export const attemptExercise = () => (dispatch, getState) => {
  const state = getState()
  console.log('state works:', state)
  // first see if entire exercise complete, if not then see if phase 1 is complete
  if ( getExerciseComplete(state) ) {
    dispatch(completeExercise())
  } else if ( getPhase1Ready(state) ) {
    dispatch(completePhase1())
  } else {
    console.log('getPhase1Ready(state)', getPhase1Ready(state))
    console.log('getExerciseComplete(state)', getExerciseComplete(state))
    retractPhase1Completion(dispatch)
    dispatch({
      type: TYPES.EXERCISE_FAIL,
      val: true,
    })
  }
}

export const completePhase1 = () => (dispatch) => {
  dispatch({
    type: TYPES.PHASE_1_COMPLETE,
    val: true,
  })
}

export const retractPhase1Completion = () => (dispatch) => {
  dispatch({
    type: TYPES.PHASE_1_COMPLETE,
    val: false,
  })
}

export const completeExercise = () => (dispatch, getState) => {
  const state = getState()
  const exerciseID = selectors.currentExerciseID(state)
  const studentID = selectors.getCurrentStudentID(state)
  dispatch(retractPhase1Completion())
  dispatch({
    type: TYPES.EXERCISE_COMPLETION_INIT,
    exerciseID,
    studentID,
  })
  db.ref(`students/${studentID}/exercises/${exerciseID}`).update({
    completed: true,
  }).then(() => {
    dispatch({
      type: TYPES.EXERCISE_COMPLETION_SUCCESS,
      exerciseID,
      studentID,
    })
    dispatch(viewTransformedExercise())
  })
  reset(dispatch)
}
window.completeExercise = completeExercise

export const nextExercise = () => (dispatch, getState) => {
  dispatch(selectExercise())
  dispatch(reset())
  dispatch(closeTransformedExercise())
}

export const viewTransformedExercise = () => (dispatch) => {
  dispatch({
    type: TYPES.VIEW_TRANSFORMED_EXERCISE,
    val: true,
  })
}

export const closeTransformedExercise = () => (dispatch) => {
  dispatch({
    type: TYPES.VIEW_TRANSFORMED_EXERCISE,
    val: false,
  })
}

window.completeExercise = completeExercise

export const reset = () => (dispatch) => {
  dispatch(updateInputs({
    FV: '',
    FG: '',
    RV: '',
    RG: ''
  }))
  dispatch(retractPhase1Completion())
}