import React from 'react'
import EditButtonIcon from './EditButtonIcon'

describe('EditButtonIcon', () => {
  it('EditButtonIcon matches the snapshot', () => {
    const wrapper = window.shallow(<EditButtonIcon />)
    expect(wrapper).toMatchSnapshot()
  })
})
