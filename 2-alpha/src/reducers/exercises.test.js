import * as TYPES from '../actions/types'
import {
  currentExercise,
  exercisesById,
  exercisesList,
  filterText,
  sortBy,
} from './exercises'
import { data } from '../tests/exercises_fixtures'

describe('currentExercise', () => {
  const action = {}
  test('begins with null', () => {
    expect(currentExercise(undefined, action)).toBe(null)
  })

  test('providing a string ID sets the current exercise, regardless if the exercise exists or not', () => {
    const payload = 'hello_world'
    const action = {
      type: TYPES.SELECT_EXERCISE,
      payload
    }
    expect(currentExercise(undefined, action)).toEqual(payload)
  })
})

describe('exercisesById', () => {
  test('Initialises an empty object', () => {
    const action = {}
    expect(exercisesById(undefined, action)).toEqual({})
  })

  test('Initialising fetching does nothing, even with data', () => {
    const action = {
      type: TYPES.FETCH_EXERCISES_INIT,
      payload: data,
    }
    expect(exercisesById({}, action)).toEqual({})
  })

  test('Fetching exercises gives those exercises', () => {
    const action = {
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload: data,
    }
    expect(exercisesById(undefined, action)).toEqual(data)
  })

  test('Fetching exercises overrides exercises too', () => {
    const beforeState = {
      gone: {
        haystack: 'GTGTG'
      }
    }
    const action = {
      type: TYPES.FETCH_EXERCISES_SUCCESS,
      payload: data,
    }
    const result = exercisesById(beforeState, action)
    expect(result).toEqual(data)
    expect(result).not.toHaveProperty('gone')
  })

  test('Adding exercises', () => {
    const added_exercise = {
      haystack: 'ACACA'
    }
    const action = {
      type: TYPES.ADD_EXERCISE_SUCCESS,
      payload: added_exercise,
      id: 'four'
    }
    const result = exercisesById(data, action)
    expect(result).not.toBe(data)
    expect(result).toEqual({ ...data, 'four': added_exercise })
  })

  test('Adding an exercise with an already given id replaces that exercise', () => {
    const replacement_exercise = {
      haystack: 'GCGCAT'
    }
    const action = {
      type: TYPES.ADD_EXERCISE_SUCCESS,
      payload: replacement_exercise,
      id: 'two'
    }
    const result = exercisesById(data, action)
    expect(result).not.toBe(data)
    expect(result).toEqual({ ...data, 'two': replacement_exercise})
  })

})