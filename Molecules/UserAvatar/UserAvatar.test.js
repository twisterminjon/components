import React from 'react'
import UserAvatar from './UserAvatar'

describe('UserAvatar', () => {
  const size = 24
  const profileImage = 'https://www.fillmurray.com/60/60'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserAvatar size={size} profileImage={profileImage} status="available" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with an image', () => {
    const wrapper = window.shallow(<UserAvatar size={size} profileImage={profileImage} status="available" />)
    expect(wrapper.find('img')).toBeTruthy()
  })

  it('shows placeholder when no image is provided', () => {
    const wrapper = window.mount(<UserAvatar size={size} status="available" />)
    expect(wrapper.containsMatchingElement(<img alt="user avatar" src="user-placeholder.png" />)).toBeTruthy()
  })
})
