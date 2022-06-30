import React from 'react'
import MessageAttachmentFile from './MessageAttachmentFile'

describe('MessageAttachmentFile', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for sent', () => {
    const wrapper = window.shallow(
      <MessageAttachmentFile timestamp="2020-08-08T13:30:00" isOwn={true} filename="filename.pdf" onClick={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for received', () => {
    const wrapper = window.shallow(
      <MessageAttachmentFile timestamp="2020-08-08T13:30:00" isOwn={false} filename="filename.pdf" onClick={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for sending', () => {
    const wrapper = window.shallow(
      <MessageAttachmentFile
        sending={true}
        timestamp="2020-08-08T13:30:00"
        isOwn={true}
        filename="filename.pdf"
        onClick={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
