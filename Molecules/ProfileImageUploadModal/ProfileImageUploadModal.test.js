import React from 'react'

import ProfileImageUploadModal from './ProfileImageUploadModal'

describe('ProfileImageUploadModal', () => {
  const mockFun = jest.fn()

  it('matches the snapshot when shown', () => {
    const wrapper = window.shallow(<ProfileImageUploadModal onClose={mockFun} onSave={mockFun} onRemove={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(<ProfileImageUploadModal onClose={mockFun} onSave={mockFun} onRemove={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for showOptions', () => {
    const wrapper = window.shallow(
      <ProfileImageUploadModal showOptions={true} onClose={mockFun} onSave={mockFun} onRemove={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
