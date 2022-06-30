import React from 'react'
import FileSelect from './FileSelect'

describe('FileSelect', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<FileSelect onSelected={mockFun} onRejected={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
