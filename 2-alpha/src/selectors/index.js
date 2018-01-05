import * as api from '../api'
import { createSelector } from 'reselect'

const exercisesListSelector = state => state.exercisesList
const exercisesByIdSelector = state => state.exercisesById
const currentExerciseSelector = state => state.currentExercise

const forwardVectorSelector = state => state.formInputs.FV
const forwardGeneSelector = state => state.formInputs.FG
const reverseVectorSelector = state => state.formInputs.RV
const reverseGeneSelector = state => state.formInputs.RG

export const getCurrentExercise = createSelector(
  exercisesByIdSelector,
  currentExerciseSelector,
  (allExercises, currentId) => allExercises[currentId]
)

export const getBothHaystackStrands = createSelector(
  getCurrentExercise,
  ( exercise ) => console.log(exercise) || ({
    forward: exercise.haystack,
    reverse: api.complementFromString(exercise.haystack)
  })
)

export const getBothVectorStrands = createSelector(
  getCurrentExercise,
  ({ vector }) => ({
    forward: vector,
    reverse: api.complementFromString(vector)
  })
)

export const getQuestion = createSelector(
  getCurrentExercise,
  ({ question }) => question
)


/*
pseudocode
getMatches = 
[[0 = pos, 8 = length]]
[{pos: 0, length: 8}]
OR
[[2 = pos, 9 = length], [12 = pos, 9 = length]]
[{pos:2, length: 9}, {pos:12, length: 9}]
*/

// const FVErrorsSelector = createSelector(
//   forwardVectorSelector,
//   hayStackSelector,
//   (FV, haystack) => {
//     const errors = {}
//   })