import React from 'react'
import IconDeclineCall from './IconDeclineCall'

describe('IconDeclineCall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconDeclineCall color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
