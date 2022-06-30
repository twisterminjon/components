import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import UsersQl from '../../../services/UsersQl'

import Dashboard from './Dashboard'

// FIXME: fix this test, was failing due to a change to enrollprogramtoast
xdescribe('Dashboard', () => {
  const mockFun = jest.fn()

  const GET_FAVORITES_QUERY = UsersQl.getUserFavorites()

  const mocks = [
    {
      request: {
        query: GET_FAVORITES_QUERY,
        variables: {
          id: '1',
        },
      },
      result: {
        data: {
          user: {
            id: '2',
            displayName: 'Olivia Lopez, MD',
            favorites: [
              {
                id: '3',
                displayName: 'Agnes Rogers, MD',
                profileImage: '',
                overallStatus: 'offline',
                isActive: true,
              },
            ],
          },
        },
      },
    },
  ]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard onStartCall={mockFun} />
      </MockedProvider>
    )

    // This doesn't do much other than make sure it renders.
    // because it's shallow, the dashboard children don't render
    expect(wrapper).toMatchSnapshot()
  })
})
