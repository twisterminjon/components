import React from 'react'
import IconSearch from './IconSearch'

describe('IconSearch', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconSearch color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
