import React from 'react'

import StatusBubbleSettings from './StatusBubbleSettings'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

describe('StatusBubbleSettings', () => {
  it('matches the snapshot for available', () => {
    const wrapper = window.shallow(<StatusBubbleSettings status={USER_STATUS_AVAILABLE} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for busy', () => {
    const wrapper = window.shallow(<StatusBubbleSettings status={USER_STATUS_BUSY} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for away', () => {
    const wrapper = window.shallow(<StatusBubbleSettings status={USER_STATUS_AWAY} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for offline', () => {
    const wrapper = window.shallow(<StatusBubbleSettings status={USER_STATUS_OFFLINE} />)
    expect(wrapper).toMatchSnapshot()
  })
})
