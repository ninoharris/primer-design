import React from 'react'
import { shallow } from 'enzyme'
import { AdminHomePage } from './AdminHomePage'

test('AdminHomePage shallow renders correctly', () => {
  const wrapper = shallow(<AdminHomePage />)
  expect(wrapper).toMatchSnapshot()
})