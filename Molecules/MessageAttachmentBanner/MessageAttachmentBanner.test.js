import React from 'react'
import MessageAttachmentBanner from './MessageAttachmentBanner'

describe('MessageAttachmentBanner', () => {
  const mockClose = jest.fn()
  const mockDownload = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MessageAttachmentBanner onClose={mockClose} onDownload={mockDownload} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('calls the close prop when the button is clicked', () => {
    const wrapper = window.shallow(<MessageAttachmentBanner onClose={mockClose} onDownload={mockDownload} />)

    wrapper.find('[data-testid="attachment-close"]').simulate('click')

    expect(mockClose).toHaveBeenCalled()
  })

  it('calls the download prop when the button is clicked', () => {
    const wrapper = window.shallow(<MessageAttachmentBanner onClose={mockClose} onDownload={mockDownload} />)

    wrapper.find('[data-testid="attachment-download"]').simulate('click')

    expect(mockDownload).toHaveBeenCalled()
  })
})
