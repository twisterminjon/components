import React from 'react'
import FavBarLoader from './FavBarLoader'

describe('FavBarLoader', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<FavBarLoader />)
    expect(wrapper).toMatchSnapshot()
  })
})
