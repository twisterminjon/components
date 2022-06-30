import React from 'react'
import TextAreaInput from './TextAreaInput'

describe('TextAreaInput', () => {
  const label = 'Klingon'
  const value = 'Worf'
  const error = 'It is busted'
  const hintMessage = 'Itza me, mario'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <TextAreaInput name="test-item" label={label} value={value} errorMessage={error} hasError={false} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('passes the label prop down', () => {
    const wrapper = window.shallow(
      <TextAreaInput name="test-item" label={label} value={value} errorMessage={error} hasError={false} />
    )
    expect(wrapper.find('InputLabel').prop('label')).toEqual(label)
  })

  it('matches the snapshot when a hint is present', () => {
    const wrapper = window.shallow(
      <TextAreaInput
        name="test-item"
        label={label}
        value={value}
        errorMessage={error}
        hasError={false}
        hintText={hintMessage}
      />
    )
    expect(wrapper.find('InputLabel').prop('label')).toEqual(label)
  })

  it('passes the hasError prop down', () => {
    const wrapper = window.shallow(
      <TextAreaInput name="test-item" label={label} value={value} errorMessage={error} hasError={true} />
    )
    expect(wrapper.find('TextInputFieldArea').prop('hasError')).toBeTruthy()
    expect(wrapper.find('InputMessage').prop('show')).toBeTruthy()
  })

  it('passes the error prop down', () => {
    const wrapper = window.shallow(
      <TextAreaInput name="test-item" label={label} value={value} errorMessage={error} hasError={true} />
    )
    expect(wrapper.find('InputMessage').prop('message')).toEqual(error)
  })

  it('shows the required label', () => {
    const wrapper = window.shallow(<TextAreaInput name="test-item" label={label} value={value} required={true} />)

    expect(wrapper.find('RequiredLabel').text()).toBeTruthy()
  })
})
