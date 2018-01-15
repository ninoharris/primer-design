import * as TYPES from '../actions/types'

export const game = (state = {}, action) => {
  switch(action.type) {
  default: return state
  }
}

export const loading = (state = true, action) => {
  switch (action.type) {
    case TYPES.FETCH_EXERCISES_INIT:
      return true
    case TYPES.SELECT_EXERCISE:
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

// export const evaluationDisplayToggle = (state = false, action) => {
//   switch (action.type) {
//     case 'TOGGLE_EVALUATION':
//     return action.payload
//     default: return state
//   }
// }

export const success = (state = false, action) => {
  switch (action.type) {
    case TYPES.EXERCISE_SUCCESS:
      return true
    case TYPES.NEW_EXERCISE:
    case TYPES.EXERCISE_FAIL:
      return false
    default: return state
  }
}

export const restrictionSites = (state = {}, action) => {
  return state
}

export const formInputs = (state = { FV: '', FG: '', RV: '', RG: '' }, action) => {
  switch (action.type) {
    case 'UPDATE_FV':
      return { ...state, FV: action.userInput }
    case 'UPDATE_FG':
      return { ...state, FG: action.userInput }
    case 'UPDATE_RV':
      return { ...state, RV: action.userInput }
    case 'UPDATE_RG':
      return { ...state, RG: action.userInput }
    default:
      return state
  }
}