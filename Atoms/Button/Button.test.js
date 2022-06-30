import React from 'react'
import Button from './Button'

describe('Button', () => {
  const buttonLabel = 'Click me'
  const mockFn = jest.fn()

  it('contains the correct button text', () => {
    const wrapper = window.shallow(<Button onClick={mockFn}>{buttonLabel}</Button>)
    expect(
      wrapper
        .find('Button')
        .childAt(0)
        .text()
    ).toEqual(buttonLabel)
  })
})
