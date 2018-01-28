import * as TYPES from './types'
import db from '../firebase/firebase'

export const addExercise = (exerciseData = {}) => (dispatch, getState) => {
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

  // firebase update
  return db.ref('exercises').push(exercise).then(snapshot => {
    const id = snapshot.key
    dispatch({
      type: TYPES.ADD_EXERCISE_SUCCESS,
      payload: exercise,
      id,
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

export const updateExerciseFilter = (text) => {
  return {
    type: TYPES.FILTER_EXERCISES_BY_TEXT,
    payload: text,
  }
}