import React from 'react'
import CallButton from './CallButton'
import IconDeclineCall from '../../Atoms/Icons/IconDeclineCall'

describe('CallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CallButton onClick={mockFunction} color="red" name="test">
        <IconDeclineCall />
      </CallButton>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
