import React from 'react'
import MessagesEmpty from './MessagesEmpty'

describe('MessagesEmpty', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MessagesEmpty />)
    expect(wrapper).toMatchSnapshot()
  })
})
