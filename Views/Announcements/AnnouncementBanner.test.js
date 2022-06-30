import React from 'react'

import AnnouncementBanner from './AnnouncementBanner'

describe('AnnouncementBanner', () => {
  it('AnnouncementBanner matches the snapshot', () => {
    const wrapper = window.shallow(<AnnouncementBanner text="im a banner!" />)

    expect(wrapper).toMatchSnapshot()
  })
})
