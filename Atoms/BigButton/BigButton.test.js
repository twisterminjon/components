import React from 'react'
import BigButton from './BigButton'

describe('BigButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<BigButton onClick={mockFunction} label="button label" name="test" />)
    expect(wrapper).toMatchSnapshot()
  })
})
