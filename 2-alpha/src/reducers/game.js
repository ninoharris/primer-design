import { combineReducers } from 'redux'
import * as TYPES from '../actions/types'

export const game = (state = {}, action) => {
  switch(action.type) {
  default: return state
  }
}

export const currentStudent = (state = {}, action) => {
  switch (action.type) {
    case TYPES.FETCH_STUDENT_SUCCESS:
      return action.payload
    default: return state
  }
}

export const currentExerciseList = (state = {}, action) => {
  switch (action.type) {
    case TYPES.FETCH_COHORT_STUDENT_INTERFACE_SUCCESS:
      return action.payload
    default: return state
  }
}

export const currentStudentID = (state = null, action) => {
  switch (action.type) {
  case TYPES.UPDATE_CURRENT_STUDENT_ID:
    return action.id
  default: return state
  }
}

export const fetchingExercises = (state = true, action) => {
  switch (action.type) {
    case TYPES.FETCH_EXERCISES_INIT:
      return true
    case TYPES.FETCH_EXERCISES_SUCCESS:
    case TYPES.FETCHED_EXERCISES_FROM_CACHED:
      return false
    default: return state
  }
}

export const showCodons = (state = true, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_CODONS:
      return action.payload
    default: return state
  }
}

export const showAdminEvaluation = (state = false, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_ADMIN_EVALUATION:
      return action.payload
    default: return state
  }
}

export const success = (state = false, action) => {
  switch (action.type) {
    case TYPES.EXERCISE_SUCCESS:
      return true
    case TYPES.ADD_EXERCISE:
    case TYPES.EXERCISE_FAIL:
      return false
    default: return state
  }
}

export const restrictionSites = (state = {}, action) => {
  return state
}

export const editingInputs = (state = { FV: false, RV: false, FG: false, RG: false }, action) => {
  switch (action.type) {
    case TYPES.EDITING_GAME_INPUT:
      return { ...state, [action.input]: action.isEditing}
    default: return state
  }
}

// export const formInputs = (state = { FV: '', FG: '', RV: '', RG: '' }, action) => {
//   switch (action.type) {
//     case 'UPDATE_FV':
//       return { ...state, FV: action.userInput }
//     case 'UPDATE_FG':
//       return { ...state, FG: action.userInput }
//     case 'UPDATE_RV':
//       return { ...state, RV: action.userInput }
//     case 'UPDATE_RG':
//       return { ...state, RG: action.userInput }
//     default:
//       console.log('Initialising', state)
//       return state
//   }
// }

const inputReducer = (name) => (state = '', action) => {
  switch (action.type) {
    case `UPDATE_${name}`:
      return action.userInput
    default: return state
  }
}

export const formInputs = combineReducers({
  FV: inputReducer('FV'),
  RV: inputReducer('RV'),
  FG: inputReducer('FG'),
  RG: inputReducer('RG'),
})