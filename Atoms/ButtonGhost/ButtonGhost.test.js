import React from 'react'
import ButtonGhost from './ButtonGhost'

describe('ButtonGhost', () => {
  const buttonLabel = 'Click me'

  it('contains the correct button text', () => {
    const wrapper = window.shallow(<ButtonGhost>{buttonLabel}</ButtonGhost>)
    expect(
      wrapper
        .find('Button')
        .childAt(0)
        .text()
    ).toEqual(buttonLabel)
  })
})
