import { combineReducers } from 'redux' 
import { reducer as formReducer } from 'redux-form'
import * as game from './game'
import * as exercises from './exercises'
import troubleshooter from './troubleshooter'
import * as TYPES from '../actions/types'


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

const charMultilineWidth = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_MULTILINE_WIDTH:
      return action.payload
    default: return state
  }
}

const reducer = combineReducers({
  ...game,
  ...exercises,
  charMultilineWidth,
  animatingPreview,
  troubleshooter,
  form: formReducer
})

export default reducer