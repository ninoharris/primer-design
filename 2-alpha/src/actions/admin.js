import _ from 'lodash'
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

export const removeExercise = (id) => (dispatch) => {
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

export const updateAuthorName = (uid, fullName) => (dispatch) => {
  return db.ref(`authors/${uid}`).update({ fullName })
  .then(() => {
    dispatch({
      type: TYPES.UPDATE_AUTHOR_NAME,
      uid,
      fullName,
    })
  }).catch((err) => {
    dispatch({
      type: TYPES.UPDATE_AUTHOR_NAME_FAIL
    })
  })
}

export const fetchCohorts = () => (dispatch) => {
  dispatch({ type: TYPES.FETCH_COHORTS_INIT })

  return db.ref('cohorts').once('value', (snapshot) => {
    // const payload = {}
    // snapshot.forEach((childSnapshot) => {
    //   let { studentIDs, exerciseIDs, ...rest } = childSnapshot.val()
    //   studentIDs = _.flatMap(studentIDs, (v, key) => key)
    //   exerciseIDs = _.flatMap(exerciseIDs, (v, key) => key)
    //   payload[childSnapshot.key] = { ...rest, studentIDs, exerciseIDs }
    // })
    dispatch({
      type: TYPES.FETCH_COHORTS_SUCCESS,
      payload: snapshot.val(),
    })
  })
}

export const fetchCohort = (id) => (dispatch) => {
  dispatch({ type: TYPES.FETCH_COHORT_INIT })

  return db.ref(`cohorts/${id}`).once('value')
  .then((snapshot) => {
    dispatch({
      type: TYPES.FETCH_COHORT_SUCCESS,
      id: snapshot.key,
      payload: snapshot.val(),
    })
    return snapshot.val()
  })
}

// students array should be [{ studentID, fullName, etc...}]
export const addCohort = ({ exerciseIDs = [], students = [], cohortName = '', authorID = ''}) => (dispatch) => {
  dispatch({ type: TYPES.ADD_COHORT_INIT })

  // check every student's ID doesnt exist before continuing, then return studentIDs object in promise for 'cohorts' path
  const studentsPromise = Promise.all(students.map(({studentID}) => firebasePathAlreadyExists(db, `students/${studentID}`)))
  .then(() => students.map( ({ studentID }) => studentID ))
  .then((data) => console.log(data) || data)
  .then((studentIDs) => arrToObj(studentIDs)) // { sedm4648: true, some5000: true }
  .then((data) => console.log(data) || data)
  .catch((err) => {
    dispatch({ type: TYPES.STUDENT_ALREADY_EXISTS, payload: err, })
    return Promise.reject(err)
  })
  
  // check every exercise exists before continuing
  const exercisesPromise = Promise.all(
    exerciseIDs.map((exerciseID) => firebasePathExists(db, `exercises/${exerciseID}`)))
  .then(() => arrToObj(exerciseIDs))
  .catch((err) => {
    dispatch({ type: TYPES.EXERCISE_DOESNT_EXIST, payload: err, })
    return Promise.reject(err)
  })

  // author exists
  const authorPromise = firebasePathExists(db, `authors/${authorID}`)

  // all good
  Promise.all([studentsPromise, exercisesPromise, authorPromise]).then((data) => {
    const [studentIDs, exerciseIDs] = data
    console.log('some stuff', studentIDs, exerciseIDs)
    // add cohort
    db.ref('cohorts').push({ exerciseIDs, studentIDs, cohortName, authorID }).then((snapshot) => {
      const cohortID = snapshot.key
      dispatch({
        type: TYPES.ADD_COHORT_SUCCESS,
        cohortID,
      })
      // add students
      const studentsObj = students.reduce((obj, { studentID, ...rest }) => ({ ...obj, [studentID]: { ...rest, cohortID } }), {})
      console.log(studentsObj)
      db.ref('students').update(studentsObj)
    })
  })
  .catch(err => {
    dispatch({
      type: TYPES.ADD_COHORT_FAIL,
      err,
    })
  })
}

export const removeCohort = (id) => (dispatch) => {
  dispatch({ type: TYPES.REMOVE_COHORT_INIT})
  // get all students associated with cohort and delete them first.
  db.ref(`cohorts/${id}`).once('value').then(snapshot => {
    return _.mapValues(snapshot.val().studentIDs, x => null) // return object of { id1: null, id2: null, ... }
  })
  .then((studentIDs) => db.ref('students').update({...studentIDs})) // remove students
  .then(() => db.ref(`cohorts/${id}`).set(null)) // remove cohort
  .then(() => dispatch({ type: TYPES.REMOVE_COHORT_SUCCESS }))
}

export const updateCohortName = (id, name) => (dispatch) => {
  dispatch({
    type: TYPES.UPDATE_COHORT_NAME_INIT,
    id,
    name,
  })
  db.ref(`cohorts/${id}`).update({ cohortName: name })
  .then(() => dispatch({ 
    type: TYPES.UPDATE_COHORT_NAME_SUCCESS,
    id, 
    name,
  }))
}

export const addExerciseToCohort = (cohortID, exerciseID) => (dispatch) => {
  dispatch({
    type: TYPES.ADD_COHORT_EXERCISE_INIT,
    cohortID,
    exerciseID,
  })
  return firebasePathExists(db, `exercises/${exerciseID}`).then(() => // check exercise exists
    db.ref(`cohorts/${cohortID}/exerciseIDs`).update({ [exerciseID]: true })) // add exercise to cohort
    .then(() => dispatch({
      type: TYPES.ADD_COHORT_EXERCISE_SUCCESS,
      cohortID, 
      exerciseID,
    }))
    .catch((err) => {
      return dispatch({
        type: 'EXERCISE DOES NOT EXIST'
      })
    })
}

export const removeExerciseFromCohort = (cohortID, exerciseID) => (dispatch) => {
  dispatch({
    type: TYPES.REMOVE_COHORT_EXERCISE_INIT,
    cohortID,
    exerciseID,
  })
  console.log(`cohorts/${cohortID}/exerciseIDs/${exerciseID}`)
  return db.ref(`cohorts/${cohortID}/exerciseIDs/${exerciseID}`).set(null) // add exercise to cohort
    .then(() => dispatch({
      type: TYPES.REMOVE_COHORT_EXERCISE_SUCCESS,
      cohortID,
      exerciseID,
    }))
    .catch((err) => {
      return dispatch({
        type: 'EXERCISE DOES NOT EXIST'
      })
    })
}

// ids object usually given by cohort
export const fetchStudents = (ids = {}) => (dispatch) => {
  dispatch({
    type: TYPES.FETCH_STUDENTS_INIT
  })

  const studentIDs = _.keys(ids)
  return Promise.all(studentIDs.map(id => db.ref(`students/${id}`).once('value').then((snapshot) => {
    console.log('student snapshot', snapshot.val())
    return { [snapshot.key]: snapshot.val() } // return array of objects of { studentID: data }
  }))).then((data) => {
    dispatch({
      type: TYPES.FETCH_STUDENTS_SUCCESS,
      payload: data.reduce((obj, curr) => ({...obj, ...curr}), {})
    })
  })
    
    
  //   const payload = snapshot.val()
  //   dispatch({
  //     type: TYPES.FETCH_STUDENTS_SUCCESS,
  //     payload,
  //   })
  // })
}

export const addStudent = ({studentID, ...rest}) => (dispatch) => {
  const { cohortID, authorID, fullName } = rest
  dispatch({
    type: TYPES.ADD_STUDENT_INIT,
    studentID,
    ...rest
  })
  // check if student doesn't already exist
  return firebasePathAlreadyExists(db, `students/${studentID}`)
  .then(() => firebasePathExists(db, `cohorts/${cohortID}`)) // a student must be added to a cohort
  .then(() => db.ref('students').update({ [studentID]: { cohortID, authorID, fullName} })) // add student to students records
  .then(() => db.ref(`cohorts/${cohortID}/studentIDs`).update({ [studentID]: true })) // add student to its particular cohort record
  .then(() => dispatch({
    type: TYPES.ADD_STUDENT_SUCCESS,
    studentID,
  }))
  .catch(err => {
    dispatch({
      type: TYPES.ADD_STUDENT_FAIL,
      studentID,
      err,
    })
    return Promise.reject(err)
  })
}

export const updateStudent = ({ id, fullName }) => (dispatch) => {
  dispatch({
    type: TYPES.ADD_STUDENT_INIT
  })
  // check student doesnt exist
  return firebasePathExists(`students/${id}`)
  .then(() => 
    db.ref(`students/${id}`).update({
      fullName,
    }))
  .then(() => {
    dispatch({
      type: TYPES.ADD_STUDENT_SUCCESS,
      id,
    })
  })
  .catch(err => {
    dispatch({ 
      type: TYPES.ADD_STUDENT_FAIL,
      id,
      err,
    })
    return Promise.reject(err)
  })
}

export const removeStudent = (id) => (dispatch) => {
  dispatch({
    type: TYPES.REMOVE_STUDENT_INIT,
    id
  })
  return db.ref(`students/${id}`).once('value')
  .then((snapshot) =>  snapshot.val().cohortID) // get associated cohort and delete the students ID from that cohorts record
  .then((cohortID) => db.ref(`cohorts/${cohortID}/studentIDs/${id}`).set(null))
  .then(() => db.ref(`students/${id}`).set(null))
  .then(() => dispatch({
    type: TYPES.REMOVE_STUDENT_SUCCESS,
  }))
  .catch(err => {
    dispatch({
      type: TYPES.REMOVE_STUDENT_FAIL,
      err,
    })
    return Promise.reject(err)
  })
}

window.addCohort = addCohort
window.removeCohort = removeCohort
window.addStudent = addStudent