import React from 'react'
import LanguageButton from './LanguageButton'

describe('LanguageButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<LanguageButton onClick={mockFunction} label="button label" name="test" />)
    expect(wrapper).toMatchSnapshot()
  })
})
