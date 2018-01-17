import _ from 'lodash'
import * as TYPES from '../actions/types'

export const exercisesById = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_EXERCISES_SUCCESS':
      return {...state, ...action.payload}
    default: return state
  }
}

export const exercisesList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EXERCISES_SUCCESS':
      return _.union(state, _.keys(action.payload))
    default: return state
  }
}

export const currentExercise = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_EXERCISE':
      return action.payload // id of exercise
    default: return state
  }
}

export const filterText = (state = '', action) => {
  switch (action.type) {
    case TYPES.FILTER_EXERCISES_BY_TEXT:
      return action.payload
    default: return state
  }
}

// export default exercises