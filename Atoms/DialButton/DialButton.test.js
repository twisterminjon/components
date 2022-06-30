import React from 'react'

import DialButton from './DialButton'
import { USER_STATUS_AVAILABLE } from '../../../constants'

describe('DialButton', () => {
  const mockFunction = jest.fn()

  // Note: DialButton does additional determination of status internally,
  // determined by user context
  it('matches the snapshot if does not have mic and cam', () => {
    const wrapper = window.shallow(<DialButton onClick={mockFunction} dimmed={false} status={USER_STATUS_AVAILABLE} />)
    expect(wrapper).toMatchSnapshot()
  })
})
