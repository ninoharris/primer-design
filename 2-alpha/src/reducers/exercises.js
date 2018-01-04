import _ from 'lodash'

export const exercises = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_EXERCISES_SUCCESS':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default exercises