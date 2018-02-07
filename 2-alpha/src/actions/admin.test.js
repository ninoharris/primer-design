import * as TYPES from './types'
import { updateExerciseFilter, updateSortBy, } from './admin'


test('Updating the exercise filter', () => {
  const filter = 'SacIII vector'
  expect(updateExerciseFilter(filter)).toEqual({
    type: TYPES.FILTER_EXERCISES_BY_TEXT,
    payload: filter,
  })
})

test('Updating the exercise sorting property', () => {
  const sortBy = 'createdAt'
  expect(updateSortBy(sortBy)).toEqual({
    type: TYPES.SORT_EXERCISES_BY,
    payload: sortBy
  })
})