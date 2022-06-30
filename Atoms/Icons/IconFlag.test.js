import React from 'react'
import IconFlag from './IconFlag'

describe('IconFlag', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconFlag color="#DA0000" width={25} height={26} />)

    expect(wrapper).toMatchSnapshot()
  })
})
