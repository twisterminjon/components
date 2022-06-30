import React from 'react'
import IconSkipCall from './IconSkipCall'

describe('IconSkipCall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconSkipCall color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
