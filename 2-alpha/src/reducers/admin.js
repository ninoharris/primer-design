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

export const currentAdminId = (state = '', action = {}) => {
  switch (action.type) {
    case TYPES.LOGGED_IN_ADMIN:
      return action.uid
    case TYPES.LOGGED_OUT_ADMIN:
      return ''
    default: return state;
  }
}