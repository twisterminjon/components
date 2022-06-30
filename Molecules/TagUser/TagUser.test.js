import React from 'react'

import TagUser from './TagUser'

describe('TextAreaInput', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <TagUser displayName="Check" onClick={mockFun} profileImage="https://www.fillmurray.com/100/100" />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
