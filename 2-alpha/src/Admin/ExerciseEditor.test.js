import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'

import { ExerciseEditor } from './ExerciseEditor'

test('should render ExerciseEditor correctly', () => {
  const wrapper = shallow(<ExerciseEditor />)
  expect(wrapper.find(Field).length).toBeGreaterThan(5)
})