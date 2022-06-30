import React from 'react'
import ProfilePicEdit from './ProfilePicEdit'

describe('ProfilePicEdit', () => {
  const mockFun = jest.fn()
  const picSource = 'https://www.fillmurray.com/300/300'

  it('ProfilePicEdit matches the snapshot', () => {
    const wrapper = window.shallow(<ProfilePicEdit profileImage={picSource} onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
