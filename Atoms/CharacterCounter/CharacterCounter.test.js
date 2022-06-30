import React from 'react'
import CharacterCounter from './CharacterCounter'

describe('CharacterCounter', () => {
  const textValue = 'I am an SMS message of xxx characters'
  const maxValue = 430

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<CharacterCounter text={textValue} maxLength={maxValue} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('measures the correct text length', () => {
    const wrapper = window.shallow(<CharacterCounter text={textValue} maxLength={maxValue} />)
    const textString = wrapper.find('[data-testid="character-counter"]').text()
    const spaceLoc = textString.indexOf(' ')
    const textLen = parseInt(textString.substr(0, spaceLoc), 10)

    expect(textLen).toEqual(textValue.length)
  })
})
