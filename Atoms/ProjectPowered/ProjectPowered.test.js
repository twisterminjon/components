import React from 'react'
import ProjectPowered from './ProjectPowered'

describe('ProjectPowered', () => {
  it('matches the snapshot - search', () => {
    const wrapper = window.shallow(<ProjectPowered />)

    expect(wrapper).toMatchSnapshot()
  })
})
