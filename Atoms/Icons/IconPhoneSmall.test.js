import React from 'react'
import IconPhoneSmall from './IconPhoneSmall'

describe('IconPhoneSmall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconPhoneSmall color="red" size="18" />)

    expect(wrapper).toMatchSnapshot()
  })
})
