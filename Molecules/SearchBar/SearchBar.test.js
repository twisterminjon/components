import React from 'react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SearchBar onChange={mockFun} value="search term" />)

    expect(wrapper).toMatchSnapshot()
  })
})
