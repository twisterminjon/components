import React from 'react'
import IconMicrophone from './IconMicrophone'

describe('IconMicrophone', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconMicrophone color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
