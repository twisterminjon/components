import React from 'react'
import IconCloseX from './IconCloseX'

describe('IconCloseX', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconCloseX color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
