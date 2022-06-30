import React from 'react'
import IconAddUser from './IconAddUser'

describe('IconAddUser', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconAddUser color="red" size={34} />)

    expect(wrapper).toMatchSnapshot()
  })
})
