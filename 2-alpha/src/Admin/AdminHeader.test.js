import React from 'react'
import { shallow } from 'enzyme'

import { AdminHeader } from './AdminHeader'

test('AdminHeader renders correctly', () => {
  
  const wrapper = shallow(<AdminHeader startLogout={() => {}} location={{pathname: '/'}} />)
  expect(wrapper).toMatchSnapshot()
})

test('AdminHeader calls startLogout function when logout button is clicked', () => {
  const startLogout = jest.fn()
  const wrapper = shallow(<AdminHeader startLogout={startLogout} location={{ pathname: ''}} />)
  expect(startLogout.mock.calls.length).toBe(0)
  wrapper.find('.Logout-Button').simulate('click')
  expect(startLogout.mock.calls.length).toBe(1)
})

describe('AdminHeader home button display', () => {
  test('Home button is hidden for exactly /admin', () => {
    const wrapper = shallow(<AdminHeader startLogout={() => {}} location={{pathname: '/admin'}} />)
    expect(wrapper.find('.Goto-Home').length).toBe(0)
  })
  test('Home button is hidden for any path that is not /admin', () => {
    const wrapper = shallow(<AdminHeader startLogout={() => { }} location={{ pathname: '/admin/null' }} />)
    expect(wrapper.find('.Goto-Home').length).toBe(1)
  })
})