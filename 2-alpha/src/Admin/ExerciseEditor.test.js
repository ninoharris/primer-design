import React from 'react'
import { shallow } from 'enzyme'

import { ExerciseEditor } from './ExerciseEditor'

test('should render ExerciseEditor correctly', () => {
  const wrapper = shallow(<ExerciseEditor />)
  expect(wrapper.find('input').length).toBeGreaterThan(5)
})