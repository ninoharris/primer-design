import _ from 'lodash'
import { setIn } from '../api'
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
    case TYPES.SEND_ADVICE_MESSAGE_SUCCESS:
      let adviceID = action.message.ID
      let newMessageCount = _.get(state, `summary.attemptsCount.${adviceID}`, 0) + 1
      return _.cloneDeep(setIn(state, `summary.attemptsCount.${adviceID}`, newMessageCount)) /* TODO: THIS IS HACKY AS HECK */
    default: return state
  }
}

export const cohortExerciseList = (state = {}, action) => {
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

export const userPhase1Complete = (state = false, action) => {
  switch (action.type) {
    case TYPES.PHASE_1_COMPLETE:
      return action.val
    default: return state
  }
}

export const displayCompletedExercise = (state = false, action) => {
  switch (action.type) {
    case TYPES.VIEW_TRANSFORMED_EXERCISE:
      return action.val
    default: return state
  }
} 

export const restrictionSites = (state = {}, action) => {
  return state
}

export const editingInputs = (state = null, action) => {
  switch (action.type) {
    case TYPES.EDITING_GAME_INPUT:
      return action.isEditing || null
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