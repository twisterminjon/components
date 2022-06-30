import React from 'react'
import IconEnvelope from './IconEnvelope'

describe('IconEnvelope', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconEnvelope color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
