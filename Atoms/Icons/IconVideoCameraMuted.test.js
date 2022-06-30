import React from 'react'
import IconVideoCameraMuted from './IconVideoCameraMuted'

describe('IconVideoCameraMuted', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconVideoCameraMuted color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
