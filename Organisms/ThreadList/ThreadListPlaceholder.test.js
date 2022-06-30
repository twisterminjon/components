import React from 'react'
import ThreadListPlaceholder from './ThreadListPlaceholder'

describe('ThreadListPlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ThreadListPlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
