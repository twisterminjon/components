import React from 'react'

import AnnouncementCard from './AnnouncementCard'

import { announcements } from '../../../Mocks/CurrentUser.mock'

describe('AnnouncementCard', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <AnnouncementCard
        time="1min ago"
        content={announcements[0].textSnippet}
        read={false}
        onView={mockFun}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when read', () => {
    const wrapper = window.shallow(
      <AnnouncementCard
        time="1min ago"
        content={announcements[0].textSnippet}
        read={true}
        onView={mockFun}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
