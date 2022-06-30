import React from 'react'
import IconVideoCamera from './IconVideoCamera'

describe('IconVideoCamera', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconVideoCamera color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
