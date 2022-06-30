import React from 'react'
import Radio from './Radio'

describe('Radio', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.mount(<Radio isChecked={true} onClick={mockFun} />)

    expect(wrapper.find(Radio)).toMatchSnapshot()
  })
})
