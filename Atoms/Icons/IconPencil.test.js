import React from 'react'
import IconPencil from './IconPencil'

describe('IconPencil', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconPencil color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
