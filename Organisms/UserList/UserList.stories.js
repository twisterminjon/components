import React from 'react'
import StoryRouter from 'storybook-react-router'
import { MockedProvider } from '@apollo/react-testing'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import UserList from './UserList'
import UsersQl from '../../../services/UsersQl'

const mocks = [
  {
    request: {
      query: UsersQl.updateUserFavorite(),
      variables: {
        id: '2',
        favorites: { connect: [{ id: '2' }] },
      },
    },
    result: {
      data: {
        updateUser: {
          id: '2',
          displayName: 'Buck',
          favorites: { id: '3', displayName: 'Wild' },
        },
      },
    },
  },
]

const stories = storiesOf('Provider/v1/Organisms', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MockedProvider mocks={mocks} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .addDecorator(StoryRouter())
  .add('UserList', () => {
    let users = [
      {
        id: '123',
        displayName: 'Dr. Stephen Strange',
        profileImage: 'https://www.fillmurray.com/60/60',
        overallStatus: 'available',
        favorite: true,
      },

      {
        id: '4',
        displayName: 'Nurse Jacky',
        profileImage: 'https://www.fillmurray.com/100/100',
        overallStatus: 'busy',
        favorite: false,
      },

      {
        id: '5',
        displayName: 'Dr. Douglas Powers',
        profileImage: '',
        overallStatus: 'offline',
        favorite: true,
      },

      {
        id: '1263',
        displayName: 'Una Brow',
        profileImage: 'https://www.fillmurray.com/200/200',
        overallStatus: 'available',
        favorite: false,
      },
      {
        id: '64',
        displayName: 'Dr. Douglas Powers',
        profileImage: 'https://www.fillmurray.com/160/160',
        overallStatus: 'available',
        favorite: false,
      },

      {
        id: '12634',
        displayName: 'Una Brow',
        profileImage: 'https://www.fillmurray.com/200/200',
        overallStatus: 'available',
        favorite: false,
      },
    ]

    const canMessageLab = 'canMessage'
    const canMessageDef = true
    const canMessageVal = boolean(canMessageLab, canMessageDef)

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'black',
        }}>
        <UserList
          userList={users}
          onCall={() => {
            alert('call clicked')
          }}
          onMessage={() => {
            alert('message clicked')
          }}
          canMessage={canMessageVal}
        />
      </div>
    )
  })
