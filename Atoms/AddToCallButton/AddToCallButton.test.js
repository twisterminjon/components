import React from 'react'
import AddToCallButton from './AddToCallButton'

describe('AddToCallButton', () => {
  const buttonLabel = 'Click me'

  it('contains the correct button text', () => {
    const wrapper = window.shallow(<AddToCallButton>{buttonLabel}</AddToCallButton>)
    expect(
      wrapper
        .find('Button')
        .childAt(0)
        .text()
    ).toEqual(buttonLabel)
  })
})
