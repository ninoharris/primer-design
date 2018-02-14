import { arrToObj, firebasePathExists, firebasePathAlreadyExists } from '../api'
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
  
  // db.ref('authors').on('value', (snapshot) => {
  //   const payload = snapshot.val()
  //   dispatch({
  //     type: TYPES.FETCH_AUTHORS_SUCCESS,
  //     payload,
  //   })
  // })

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

export const fetchStudent = (id) => (dispatch) => { // used for /play
  dispatch({ type: TYPES.FETCH_STUDENT_INIT })


}

export const fetchStudents = () => (dispatch) => {
  dispatch({
    type: TYPES.FETCH_STUDENTS_INIT
  })

  return db.ref('students').once('value', (snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_STUDENTS_SUCCESS,
      payload,
    })
  })
}

export const updateStudent = ({ id, fullName }) => (dispatch) => {
  dispatch({
    type: TYPES.ADD_STUDENT_INIT
  })
  // check student doesnt exist
  return db.ref(`student/${id}`).set({
    fullName,
  }).then(() => {
    dispatch({
      type: TYPES.ADD_STUDENT_SUCCESS,
      id,
    })
  })
}

export const fetchCohorts = () => (dispatch) => {
  dispatch({ type: TYPES.FETCH_COHORTS_INIT })
  
  return db.ref('cohorts').once('value', (snapshot) => {
    const payload = snapshot.val()
    dispatch({
      type: TYPES.FETCH_COHORTS_SUCCESS,
      payload,
    })
  })
}

export const addCohort = ({ exerciseIDs = [], studentIDs = [], cohortName = '', authorID = ''}) => (dispatch) => {
  dispatch({ type: TYPES.ADD_COHORT_INIT })

  // check every student exists before continuing
  const studentsPromise = Promise.all(studentIDs.map((studentID) => firebasePathExists(db, `students/${studentID}`)))
  .then(() => arrToObj(studentIDs))
  .catch((err) => {
    dispatch({ type: TYPES.STUDENT_DOESNT_EXIST, payload: err, })
  })
  
  // check every exercise exists before continuing
  const exercisesPromise = Promise.all(
    exerciseIDs.map((exerciseID) => firebasePathExists(db, `exercises/${exerciseID}`)))
  .then(() => arrToObj(exerciseIDs))
  .catch((err) => {
    dispatch({ type: TYPES.EXERCISE_DOESNT_EXIST, payload: err, })
  })

  // author exists
  const authorPromise = firebasePathExists(db, `authors/${authorID}`)

  // all good
  Promise.all([studentsPromise, exercisesPromise, authorPromise]).then((data) => {
    const students = data[0], exercises = data[1]
    db.ref('cohorts').push({ exercises, students, cohortName, authorID }).then((snapshot) => {
      const id = snapshot.key
      dispatch({
        type: TYPES.ADD_COHORT_STUDENT_SUCCESS,
        id,
      })
    })
  })
}

window.addCohort = addCohort