import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import SearchResults from './SearchResults'
import UsersQl from '../../../services/UsersQl'

const UPDATE_FAV_MUTATION = UsersQl.updateUserFavorite()

const mocks = [
  {
    request: {
      query: UPDATE_FAV_MUTATION,
      variables: {
        id: '2',
        favorites: { disconnect: [{ id: '3' }] },
      },
    },
    result: {
      data: {
        updateUser: {
          id: '2',
          displayName: 'Buck',
          favorites: [{ id: '3', displayName: 'Wild' }],
        },
      },
    },
  },
]

let users = [
  {
    id: '123',
    displayName: 'Dr. Stephen Strange',
    profileImage: 'https://www.fillmurray.com/60/60',
    overallStatus: 'available',
    favorite: false,
  },

  {
    id: '4',
    displayName: 'Nurse Jacky',
    profileImage: 'https://www.fillmurray.com/100/100',
    overallStatus: 'busy',
    favorite: true,
  },

  {
    id: '5',
    displayName: 'Dr. Douglas Powers',
    profileImage: 'https://www.fillmurray.com/160/160',
    overallStatus: 'offline',
    favorite: false,
  },

  {
    id: '1263',
    displayName: 'Una Brow',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'available',
    favorite: true,
  },
]

describe('SearchResults', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults
          users={users}
          onStartCall={mockFun}
          canMessage={true}
          canCall={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(SearchResults)).toMatchSnapshot()
  })

  it('matches the snapshot with no users', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults
          users={[]}
          onStartCall={mockFun}
          canMessage={true}
          canCall={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(SearchResults)).toMatchSnapshot()
  })

  it('matches the snapshot with one user', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults
          users={[
            {
              id: '1263',
              displayName: 'Una Brow',
              profileImage: 'https://www.fillmurray.com/200/200',
              overallStatus: 'available',
              favorite: true,
            },
          ]}
          onStartCall={mockFun}
          canMessage={true}
          canCall={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(SearchResults)).toMatchSnapshot()
  })

  it('matches the snapshot with with messaging off', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults
          users={users}
          onStartCall={mockFun}
          canMessage={false}
          canCall={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(SearchResults)).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults
          users={users}
          onStartCall={mockFun}
          canMessage={true}
          canCall={true}
          loading={true}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(SearchResults)).toMatchSnapshot()
  })
})
