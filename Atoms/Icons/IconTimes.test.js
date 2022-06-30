import React from 'react'
import IconTimes from './IconTimes'

describe('IconTimes', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconTimes color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
