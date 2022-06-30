import React from 'react'
import Loader from './Loader'

describe('Loader', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Loader show={true} label="Loading" />)
    expect(wrapper).toMatchSnapshot()
  })
})
