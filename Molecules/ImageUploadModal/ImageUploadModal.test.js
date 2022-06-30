import React from 'react'

import ImageUploadModal from './ImageUploadModal'

describe('ImageUploadModal', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ImageUploadModal onClose={mockFun} onSave={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
