import React from 'react'
import MuteAudioButton from './MuteAudioButton'

describe('MuteAudioButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MuteAudioButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<MuteAudioButton onClick={mockFunction} />)

    wrapper.find('[data-testid="button-mute-audio"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
