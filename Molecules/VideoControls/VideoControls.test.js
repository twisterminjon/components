import React from 'react'
import VideoControls from './VideoControls'

describe('VideoControls', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <VideoControls
        show={true}
        onHangup={mockFun}
        onMuteAudio={mockFun}
        onMuteVideo={mockFun}
        audioMuted={false}
        videoMuted={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('is hidden when show is false', () => {
    const wrapper = window.shallow(
      <VideoControls
        show={false}
        onHangup={mockFun}
        onMuteAudio={mockFun}
        onMuteVideo={mockFun}
        audioMuted={false}
        videoMuted={false}
      />
    )
    expect(wrapper.find('div').hasClass('videocontrols-hide')).toBeTruthy()
  })
})
