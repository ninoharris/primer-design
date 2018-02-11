import React from 'react'
import { shallow } from 'enzyme'

import { Form } from './index'

test('Form renders correctly with no inputs when no props are given', () => {
  const wrapper = shallow(<Form />)
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('input').length).toBe(4)
})

describe('Form correctly manages input displays and actions', () => {
  let FV, FG, RV, RG // random
  let updateInput, attemptCompletion
  beforeEach(() => {
    FV = 'ATGC'
    FG = 'AAAAAA'
    RV = 'TTTTTT'
    RG = 'GCTAGCTAG' // random

    updateInput = jest.fn()
    attemptCompletion = jest.fn()
  })

  test('Form displays correct inputs', () => {
    const wrapper = shallow(<Form FV={FV} FG={FG} RV={RV} RG={RG} updateInput={updateInput} attemptCompletion={attemptCompletion} />)
    expect(wrapper.find('input[name="FV"]').props().value).toBe(FV)
    expect(wrapper.find('input[name="FG"]').props().value).toBe(FG)
    expect(wrapper.find('input[name="RV"]').props().value).toBe(RV)
    expect(wrapper.find('input[name="RG"]').props().value).toBe(RG)
  })
  
  test('Form causes updateInput to be called upon changing an input', () => {
    const wrapper = shallow(<Form FV={FV} FG={FG} RV={RV} RG={RG} updateInput={updateInput} attemptCompletion={attemptCompletion} />)
    expect(updateInput.mock.calls.length).toBe(0)
    wrapper.find('input[name="FV"]').simulate('change', {
      target: {
        name: 'FV',
        value: 'HELLO WORLD'
      }
    })
    expect(updateInput.mock.calls.length).toBe(1)
    expect(updateInput.mock.calls[0][0]).toBe('FV')
    expect(updateInput.mock.calls[0][1]).toBe('HELLO WORLD')
  })

})