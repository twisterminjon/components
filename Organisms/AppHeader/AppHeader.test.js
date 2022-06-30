import React from 'react'
import AppHeader from './AppHeader'

import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'

describe('AppHeader', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for staff', () => {
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser}>
        <AppHeader
          onHome={mockFun}
          onStaff={mockFun}
          onPatients={mockFun}
          onMessage={mockFun}
          onCalls={mockFun}
          onMenu={mockFun}
          enterpriseLogo=""
          // for RR mock
          location={{ pathname: '/app/staffV1' }}
        />
      </CurrentUserContext.Provider>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
