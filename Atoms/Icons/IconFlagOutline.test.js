import React from 'react'
import IconFlagOutline from './IconFlagOutline'

describe('IconFlag', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconFlagOutline color="#92aad7" width={25} height={26} />)

    expect(wrapper).toMatchSnapshot()
  })
})
