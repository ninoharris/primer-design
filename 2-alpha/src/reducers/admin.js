import _ from 'lodash'
import { flatMap } from 'lodash'
import * as TYPES from '../actions/types'

export const adminLoggedIn = (state = false, action = {}) => {
  switch (action.type) {
  case TYPES.LOGGED_IN_ADMIN:
    return true
  case TYPES.LOGGED_OUT_ADMIN:
    return false
  default: return state;
  }
}

export const showLoggedInExercisesOnly = (state = false, action = {}) => {
  switch (action.type) {
  case TYPES.SHOW_LOGGED_IN_AUTHOR_EXERCISES_ONLY:
    return action.payload
  default: return state
  }
}

export const currentAdminId = (state = '', action = {}) => {
  switch (action.type) {
    case TYPES.LOGGED_IN_ADMIN:
      return action.uid
    case TYPES.LOGGED_OUT_ADMIN:
      return ''
    default: return state;
  }
}

export const authorsById = (state = {}, action = {}) => {
  switch (action.type) {
    case TYPES.FETCH_AUTHORS_SUCCESS:
      return action.payload
    case TYPES.UPDATE_AUTHOR_NAME:
      return {...state, [action.uid]: { fullName: action.fullName } }
    default: return state
  }
}

export const authorsList = (state = [], action = {}) => {
  switch (action.type) {
    case TYPES.FETCH_AUTHORS_SUCCESS:
      return flatMap(action.payload, (val, key) => key)
    case TYPES.UPDATE_AUTHOR_NAME:
      return { ...state, [action.uid]: { fullName: action.fullName } }
    default: return state
  }
}

export const cohorts = (state = {}, action = {}) => {
  switch (action.type) {
    case TYPES.FETCH_COHORTS_SUCCESS:
      return { ...state, ...action.payload }
    case TYPES.FETCH_COHORT_SUCCESS:
      return { ...state, [action.id]: action.payload}
    case TYPES.ADD_COHORT_EXERCISE_SUCCESS:
    case TYPES.REMOVE_COHORT_EXERCISE_SUCCESS:
      return _.mapValues(state, (v) => cohort(v, action))
    default: return state
  }
}

// const exerciseIDs = { ...cohort.exerciseIDs, [action.exerciseID]: true }

const cohort = (state = {}, action = {}) => {
  switch (action.type) {
    case TYPES.ADD_COHORT_EXERCISE_SUCCESS:
      const exerciseIDs = { ...state.exerciseIDs, [action.exerciseID]: true }
      return { ...state, exerciseIDs }
    case TYPES.REMOVE_COHORT_EXERCISE_SUCCESS:
      return { ...state, exerciseIDs: _.omit(state.exerciseIDs, action.exerciseID)}
    default: return state
  }
}

export const students = (state = {}, action = {}) => {
  switch (action.type) {
  case TYPES.FETCH_STUDENTS_SUCCESS:
    return action.payload
  case TYPES.ADD_STUDENT_SUCCESS:
    return {...state, [action.studentID]: action.payload}
  case TYPES.REMOVE_STUDENT_SUCCESS:
    return _.omit(state, action.studentID)
  case TYPES.UPDATE_STUDENT_FULLNAME_SUCCESS:
    const student = state[action.studentID]
    return {...state, [action.studentID]: {...student, fullName: action.payload }}
  default: return state
  }
}


// export const studentsById = () => {

// }