import React from 'react'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<NotFound />)
    expect(wrapper).toMatchSnapshot()
  })
})
