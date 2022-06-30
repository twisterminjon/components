import React from 'react'

import UserAvatarMe from './UserAvatarMe'
import { USER_STATUS_AVAILABLE } from '../../../constants'

describe('UserControl', () => {
  const profileImage = 'http://some.url.com/picture'

  it('matches the snapshot when showing a placeholder', () => {
    const wrapper = window.mount(<UserAvatarMe status={USER_STATUS_AVAILABLE} profileImage={profileImage} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when showing an image', () => {
    const wrapper = window.mount(<UserAvatarMe status={USER_STATUS_AVAILABLE} profileImage={profileImage} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when profileImage is empty', () => {
    const wrapper = window.mount(<UserAvatarMe status={USER_STATUS_AVAILABLE} profileImage="" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when profileImage is null', () => {
    const wrapper = window.mount(<UserAvatarMe status={USER_STATUS_AVAILABLE} profileImage="" />)
    expect(wrapper).toMatchSnapshot()
  })
})
