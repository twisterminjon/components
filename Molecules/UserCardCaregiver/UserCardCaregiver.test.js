import React from 'react'
import UserCardCaregiver from './UserCardCaregiver'
import { USER_STATUS_AVAILABLE } from '../../../constants'

describe('UserCardCaregiver', () => {
  const userName = 'Mung Bean'
  const phoneNumber = '666-555-4444'
  const profileImage = 'http://some.url.com/picture'
  const status = USER_STATUS_AVAILABLE
  const mockCall = jest.fn()
  const mockOdm = jest.fn()
  const mockMessage = jest.fn()
  const mockRemove = jest.fn()

  it('matches the snapshot with all showing', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={true}
        canCall={true}
        canMessage={true}
        showMenuButton={true}
        sendProgramEvents={false}
        displayName={userName}
        phoneNumber={phoneNumber}
        profileImage={profileImage}
        status={status}
        onOdm={mockCall}
        onCall={mockOdm}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with all hidden', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={false}
        canCall={false}
        canMessage={false}
        showMenuButton={false}
        sendProgramEvents={false}
        displayName={userName}
        phoneNumber=""
        profileImage={profileImage}
        status={status}
        onOdm={mockCall}
        onCall={mockOdm}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('calls onCall prop when clicked', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={true}
        canCall={true}
        canMessage={true}
        showMenuButton={true}
        sendProgramEvents={false}
        displayName={userName}
        phoneNumber={phoneNumber}
        profileImage={profileImage}
        status={status}
        onOdm={mockOdm}
        onCall={mockCall}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    wrapper.find('[data-testid="call-Mung Bean"]').simulate('click', { stopPropagation: () => undefined })
    expect(mockCall).toHaveBeenCalled()
  })

  it('calls onMessage prop when clicked', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={true}
        canCall={true}
        canMessage={true}
        showMenuButton={true}
        sendProgramEvents={false}
        displayName={userName}
        phoneNumber={phoneNumber}
        profileImage={profileImage}
        status={status}
        onOdm={mockOdm}
        onCall={mockCall}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    wrapper.find('[data-testid="secure-message-Mung Bean"]').simulate('click', { stopPropagation: () => undefined })
    expect(mockMessage).toHaveBeenCalled()
  })

  it('calls onMenu prop when clicked', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={true}
        canCall={true}
        canMessage={true}
        showMenuButton={true}
        sendProgramEvents={false}
        displayName={userName}
        phoneNumber={phoneNumber}
        profileImage={profileImage}
        status={status}
        onOdm={mockOdm}
        onCall={mockCall}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    wrapper.find('[data-testid="menu-Mung Bean"]').simulate('click', { stopPropagation: () => undefined })
    expect(mockRemove).toHaveBeenCalled()
  })

  it('calls onOdm prop when clicked', () => {
    const wrapper = window.shallow(
      <UserCardCaregiver
        canOdm={true}
        canCall={true}
        canMessage={true}
        showMenuButton={true}
        sendProgramEvents={true}
        displayName={userName}
        phoneNumber={phoneNumber}
        profileImage={profileImage}
        status={status}
        onOdm={mockOdm}
        onCall={mockCall}
        onMessage={mockMessage}
        onMenu={mockRemove}
      />
    )

    wrapper.find('[data-testid="odm-Mung Bean"]').simulate('click', { stopPropagation: () => undefined })
    expect(mockOdm).toHaveBeenCalled()
  })
})
