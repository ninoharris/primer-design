import React from 'react'
import { shallow } from 'enzyme'
import { Header } from './Header'

test('should render correctly', () => {
  const wrapper = shallow(<Header/>)
  expect(wrapper).toMatchSnapshot()
})

test('Header, without props, should display a logged-out container with a log in button', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper.find('.logged-out').length).toBe(1)
  expect(wrapper.find('.logged-in').length).toBe(0)
})

describe('Header, when logged in', () => {
  const username = 'sedm4648'
  const wrapper = shallow(<Header loggedIn={true} username={username} />)
  test('should display a logged in section with log out button', () => {
    expect(wrapper.find('.logged-in').length).toBe(1)
    expect(wrapper.find('.log-out').length).toBe(1)
  })
  test('should display the username', () => {
    expect(wrapper.find('.username').text()).toBe(username)
  })
})