import React from 'react'
import SearchCloseButton from './SearchCloseButton'

describe('SearchCloseButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SearchCloseButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })
})
