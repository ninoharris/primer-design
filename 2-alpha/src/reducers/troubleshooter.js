import { combineReducers } from 'redux'
import * as actions from '../actions/troubleshooter'

const FV = (state = false, action) => {
  switch (action.type) {
  case actions.TOGGLE_FV_TS:
    return action.payload
  default: return state
  }
}
const RV = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_RV_TS:
      return action.payload
    default: return state
  }
}

export default combineReducers({
  FV,
  RV,
  
})