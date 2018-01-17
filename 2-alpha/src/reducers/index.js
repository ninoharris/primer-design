import { combineReducers } from 'redux' 
import { reducer as formReducer } from 'redux-form'
import * as game from './game'
import * as exercises from './exercises'
import troubleshooter from './troubleshooter'



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
  ...game,
  ...exercises,
  animatingPreview,
  troubleshooter,
  form: formReducer
})

export default reducer