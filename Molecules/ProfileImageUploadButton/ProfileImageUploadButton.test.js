import React from 'react'
import ProfileImageUploadButton from './ProfileImageUploadButton'

describe('ImageUploadButton', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ProfileImageUploadButton
        loading={false}
        showOptions={false}
        loadingRemove={false}
        onSave={mockFun}
        onRemove={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(<ProfileImageUploadButton loading={true} onSave={mockFun} onRemove={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
