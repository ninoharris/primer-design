import React from 'react'
import LoginPage from './LoginPage'
import { shallow } from 'enzyme'

test('Snapshot of LoginPage renders properly', () => {
  const wrapper = shallow(<LoginPage />)
  expect(wrapper).toMatchSnapshot()
})