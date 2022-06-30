import React from 'react'
import SpinnerDots from './SpinnerDots'

describe('SpinnerDots', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SpinnerDots />)
    expect(wrapper).toMatchSnapshot()
  })
})
