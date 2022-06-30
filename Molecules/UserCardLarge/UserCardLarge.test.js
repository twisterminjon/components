import React from 'react'
import UserCardLarge from './UserCardLarge'
import fakeImage from '../../../Images/ent-placeholder.png'

describe('UserCardLarge', () => {
  const userName = 'Mung Bean'
  const mockFun = jest.fn()

  it('matches the snapshot w/o a profile image', () => {
    const wrapper = window.shallow(
      <UserCardLarge userName={userName} title="Head Munger" profileImage="" actionText="Bean fest" onClick={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/ a profile image', () => {
    const wrapper = window.shallow(
      <UserCardLarge
        userName={userName}
        title="Head Munger"
        profileImage={fakeImage}
        actionText="Bean fest"
        onClick={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/ a related user', () => {
    const wrapper = window.shallow(
      <UserCardLarge
        userName={userName}
        relatedUserName="Totally Related User"
        title="Head Munger"
        profileImage={fakeImage}
        relatedProfileImage={fakeImage}
        actionText="Bean fest"
        onClick={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
