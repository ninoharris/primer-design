import { combineReducers } from 'redux' 
import { game, loading, showCodons } from './game'
import { exercisesById, exercisesList, currentExercise } from './exercises'

const restrictionSites = (state = {}, action) => {
  return state
}

const formInputs = (state = { FV: '', FG: '', RV: '', RG: ''}, action) => {
  switch(action.type) {
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

const animatingPreview = (state = false, action) => {
  switch(action.type) {
  case 'ANIMATE_PREVIEW_START':
    return true
  case 'ANIMATE_PREVIEW_END':
    return false
  default:
    return state
  }
}

const reducer = combineReducers({
  restrictionSites,
  formInputs,
  animatingPreview,
  exercisesById,
  exercisesList,
  currentExercise,
  game,
  loading,
  showCodons,
})

export default reducer