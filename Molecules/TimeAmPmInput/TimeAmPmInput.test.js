import React from 'react'
import TimeAmPmInput from './TimeAmPmInput'

describe('TimeAmPmInput', () => {
  const label = 'Klingon'
  const value = 'Worf'
  const placeholder = 'Star Trek'
  const error = 'It is busted'
  const hintMessage = 'Itza me, mario'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <TimeAmPmInput label={label} value={value} placeholder={placeholder} errorMessage={error} hasError={false} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('passes the label prop down', () => {
    const wrapper = window.shallow(
      <TimeAmPmInput label={label} value={value} placeholder={placeholder} errorMessage={error} hasError={false} />
    )
    expect(wrapper.find('InputLabel').prop('label')).toEqual(label)
  })

  it('shows the hint button if a hintMessage is passed', () => {
    const wrapper = window.shallow(
      <TimeAmPmInput
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
        hintMessage={hintMessage}
      />
    )
    expect(wrapper.find('[data-testid="hint-button"]')).not.toBeNull()
  })
})
