import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import PatientHeader from './PatientHeader'
import { enterprise } from '../../../Mocks/Enterprise.mock'
import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'

import UsersQl from '../../../services/UsersQl'

const mockPicEdit = [
  {
    request: {
      query: UsersQl.updateProfilePic(),
      variables: {
        id: '18',
        file: '',
      },
    },
    result: {
      data: {
        uploadProfileImageUser: {
          id: '18',
          profileImage: '',
        },
      },
    },
  },
]

describe('PatientHeader', () => {
  const mockFun = jest.fn()
  const user = enterprise.users.filter(user => user.id === '18')[0]

  it('matches the snapshot', () => {
    const wrapper = window.mount(
      <MockedProvider mocks={mockPicEdit} addTypename={false}>
        <CurrentUserContext.Provider value={currentUser}>
          <PatientHeader
            user={user}
            loading={false}
            onProfilePicChange={mockFun}
            onCall={mockFun}
            onMessage={mockFun}
            onOnDemandMessage={mockFun}
          />
        </CurrentUserContext.Provider>
      </MockedProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
