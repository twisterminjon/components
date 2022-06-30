import React from 'react'
import GroupButton from './GroupButton'

describe('GroupButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<GroupButton onClick={mockFunction} label="button label" name="test" />)
    expect(wrapper).toMatchSnapshot()
  })
})
