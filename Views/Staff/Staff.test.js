import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import Staff from './Staff'
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

describe('Staff', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={users}
          filter=""
          onStartCall={mockFun}
          canMessage={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })

  it('matches the snapshot with no users', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={[]}
          filter=""
          onStartCall={mockFun}
          canMessage={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })

  it('matches the snapshot with one user', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={[
            {
              id: '1263',
              displayName: 'Una Brow',
              profileImage: 'https://www.fillmurray.com/200/200',
              overallStatus: 'available',
              favorite: true,
            },
          ]}
          filter=""
          onStartCall={mockFun}
          canMessage={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })

  it('matches the snapshot with a filter', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={users}
          filter="una"
          onStartCall={mockFun}
          canMessage={true}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })

  it('matches the snapshot with messaging off', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={users}
          filter=""
          onStartCall={mockFun}
          canMessage={false}
          loading={false}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })

  it('matches the snapshot with when loading', () => {
    const wrapper = window.shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Staff
          users={users}
          filter=""
          onStartCall={mockFun}
          canMessage={false}
          loading={true}
          pageNumber={0}
          onPageNumberChange={mockFun}
        />
      </MockedProvider>
    )

    expect(wrapper.find(Staff)).toMatchSnapshot()
  })
})
