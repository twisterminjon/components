import React from 'react'
import SearchBarPatients from './SearchBarPatients'

describe('SearchBarPatients', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SearchBarPatients onChange={mockFun} onAdd={mockFun} value="searchTerm" />)

    expect(wrapper).toMatchSnapshot()
  })
})
