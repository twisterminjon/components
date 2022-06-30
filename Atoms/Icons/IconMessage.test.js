import React from 'react'
import IconMessage from './IconMessage'

describe('IconMessage', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconMessage color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
