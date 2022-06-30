import React from 'react'
import IconAirplaneTop from './IconAirplaneTop'

describe('IconAirplaneTop', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconAirplaneTop color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
