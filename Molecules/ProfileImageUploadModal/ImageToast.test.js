import React from 'react'
import ImageToast from './ImageToast'

describe('ImageToast', () => {
  const mockFun = jest.fn()

  it('it matches the snapshot when shown', () => {
    const wrapper = window.shallow(
      <ImageToast show={true} loadingRemove={false} onSelectImage={mockFun} onRemoveImage={mockFun} onClose={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('it matches the snapshot when hidden', () => {
    const wrapper = window.shallow(
      <ImageToast show={false} onSelectImage={mockFun} onRemoveImage={mockFun} onClose={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('it matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <ImageToast show={true} loadingRemove={true} onSelectImage={mockFun} onRemoveImage={mockFun} onClose={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
