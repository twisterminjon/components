import React from 'react'
import IconRetryCall from './IconRetryCall'

describe('IconRetryCall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconRetryCall color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
