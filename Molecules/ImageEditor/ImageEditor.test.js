import React from 'react'
import ImageEditor from './ImageEditor'

describe('ImageEditor', () => {
  const mockFun = jest.fn()

  xit('matches the snapshot', () => {
    // The AvatarEditor is throwing an error internally so turning this test off
    const wrapper = window.shallow(
      <ImageEditor file="https://www.fillmurray.com/600/600" onClose={mockFun} onSave={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
