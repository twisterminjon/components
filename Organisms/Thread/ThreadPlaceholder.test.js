import React from 'react'
import ThreadPlaceholder from './ThreadPlaceholder'

describe('ThreadPlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ThreadPlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
