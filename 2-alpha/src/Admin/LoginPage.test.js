import React from 'react'
import { LoginPage } from './LoginPage'
import { shallow } from 'enzyme'

test('Snapshot of LoginPage renders properly', () => {
  const startLogin = jest.fn()
  const wrapper = shallow(<LoginPage startLogin={startLogin} />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('.Login-Button').simulate('click')
  expect(startLogin).toHaveBeenCalledTimes(1)
})