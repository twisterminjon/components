import React from 'react'
import CallButtonLabel from './CallButtonLabel'

describe('CallButtonLabel', () => {
  it('matches the snapshot ', () => {
    const wrapper = window.shallow(<CallButtonLabel text="I'm a label!" />)
    expect(wrapper).toMatchSnapshot()
  })
})
