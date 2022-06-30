import React from 'react'
import UnauthorizedPage from './UnauthorizedPage'

describe('UnauthorizedPage', () => {
  it('matches the snapshot ', () => {
    const wrapper = window.shallow(<UnauthorizedPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
