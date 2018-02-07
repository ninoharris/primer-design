import _ from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { ExerciseList } from './ExerciseList'
import { data } from '../tests/exercises_fixtures'

describe('exerciseList', () => {
  test('should render a table row that tells the user that there are no exercises within their filters.', () => {
  const wrapper = shallow(<ExerciseList exerciseList={[]} />)
  expect(wrapper).toMatchSnapshot()
  })
  test('should render exerciseList with list of exercises', () => {
    const exercisesArray = _.flatMap(data, (val, key) => ({ ...val, id: key }))
    const wrapper = shallow(<ExerciseList exercisesList={exercisesArray} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('tbody tr').length).toBe(exercisesArray.length)
  })
})