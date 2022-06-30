import React from 'react'
import IconPlus from './IconPlus'

describe('IconPlus', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconPlus color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
