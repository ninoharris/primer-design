import React from 'react'
import { shallow } from 'enzyme'

import { AdminHeader } from './AdminHeader'

test('AdminHeader renders correctly', () => {
  
  const wrapper = shallow(<AdminHeader startAdminLogout={() => {}} location={{pathname: '/'}} />)
  expect(wrapper).toMatchSnapshot()
})

test('AdminHeader calls startAdminLogout function when logout button is clicked', () => {
  const startAdminLogout = jest.fn()
  const wrapper = shallow(<AdminHeader startAdminLogout={startAdminLogout} location={{ pathname: ''}} />)
  expect(startAdminLogout).toHaveBeenCalledTimes(0)
  wrapper.find('.Logout-Button').simulate('click')
  expect(startAdminLogout).toHaveBeenCalledTimes(1)
})

describe('AdminHeader home button display', () => {
  test('Home button is hidden for exactly /admin', () => {
    const wrapper = shallow(<AdminHeader startAdminLogout={() => {}} location={{pathname: '/admin'}} />)
    expect(wrapper.find('.Goto-Home').length).toBe(0)
  })
  test('Home button is hidden for any path that is not /admin', () => {
    const wrapper = shallow(<AdminHeader startAdminLogout={() => { }} location={{ pathname: '/admin/null' }} />)
    expect(wrapper.find('.Goto-Home').length).toBe(1)
  })
})