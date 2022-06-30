import React from 'react'
import EnterpriseLogo from './EnterpriseLogo'

describe('EnterpriseLogo', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<EnterpriseLogo imgUrl="" />)

    expect(wrapper).toMatchSnapshot()
  })
})
