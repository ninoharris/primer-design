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
      return action.payload
    default: return state
  }
}

// export const studentsById = () => {

// }