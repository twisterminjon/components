import React from 'react'
import IconMicrophoneMuted from './IconMicrophoneMuted'

describe('IconMicrophoneMuted', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconMicrophoneMuted color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
