import React from 'react'
import MessageAttachmentThumbnail from './MessageAttachmentThumbnail'

describe('MessageAttachmentThumbnail', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <MessageAttachmentThumbnail onClick={mockFun} timestamp="2020-08-08T13:30:00">
        <img alt="attachment" src="https://www.fillmurray.com/800/1200" />
      </MessageAttachmentThumbnail>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for sending', () => {
    const wrapper = window.shallow(
      <MessageAttachmentThumbnail isOwn={true} sending={true} onClick={mockFun} timestamp="2020-08-08T13:30:00">
        <img alt="attachment" src="https://www.fillmurray.com/800/1200" />
      </MessageAttachmentThumbnail>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
