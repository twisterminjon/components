import React from 'react'
import Dimmer from './Dimmer'

describe('Dimmer', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Dimmer show={true} />)
    expect(wrapper).toMatchSnapshot()
  })
})
