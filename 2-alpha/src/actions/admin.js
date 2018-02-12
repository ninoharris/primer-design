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

// export const removeExercise = (id) => 

export const startRemoveExercise = (id) => (dispatch) => {
  dispatch({
    type: TYPES.DELETE_EXERCISE_INIT,
    id
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

export const updateSortBy = (val) => {
  return {
    type: TYPES.SORT_EXERCISES_BY,
    payload: val,
  }
}

export const updateShowOwnExercises = (payload) => ({
  type: TYPES.SHOW_LOGGED_IN_AUTHOR_EXERCISES_ONLY,
  payload,
})

// Notifications
const notifyDeleted = (id) => (dispatch) => {
  dispatch({
    type: TYPES.NOTIFY_DELETED,
    id,
  })
  setTimeout(() => {
    dispatch({
      type: TYPES.NOTIFY_DELETED,
      id,
    })
  })
}


// Author information
export const fetchAuthors = () => (dispatch) => {
  dispatch({
    type: TYPES.FETCH_AUTHORS_INIT
  })
  
  db.ref('authors').on('value', (snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_AUTHORS_SUCCESS,
      payload,
    })
  })

  return db.ref('authors').once('value', (snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_AUTHORS_SUCCESS,
      payload,
    })
  })
}

export const updateAdminName = (uid, name) => (dispatch) => {
  return db.ref(`authors/${uid}`).set({
    name,
  }).then(() => {
    dispatch({
      type: TYPES.UPDATE_AUTHOR_NAME,
      uid,
      name,
    })
  }).catch((err) => {
    dispatch({
      type: TYPES.UPDATE_AUTHOR_NAME_FAIL
    })
  })
}