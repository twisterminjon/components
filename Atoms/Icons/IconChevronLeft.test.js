import React from 'react'
import IconChevronLeft from './IconChevronLeft'

describe('IconChevronLeft', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconChevronLeft color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
