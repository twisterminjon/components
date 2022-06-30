import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import Staff from './Staff'
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

const stories = storiesOf('Provider/v1/Views', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .add('Staff', () => {
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

    const filterLab = 'filter'
    const filterDef = ''
    const filterVal = text(filterLab, filterDef)

    const canMessageLab = 'canMessage'
    const canMessageDef = true
    const canMessageVal = boolean(canMessageLab, canMessageDef)

    const userCountLab = 'userCount'
    const userCountOpts = {
      0: '0',
      1: '1',
      many: 'many',
    }
    const userCountDef = 'many'
    const userCountVal = select(userCountLab, userCountOpts, userCountDef)

    let usersVal = []
    switch (userCountVal) {
      case '0':
        usersVal = []
        break

      case '1':
        usersVal = [
          {
            id: '1263',
            displayName: 'Una Brow',
            profileImage: 'https://www.fillmurray.com/200/200',
            overallStatus: 'available',
            favorite: true,
          },
        ]
        break

      default:
        usersVal = users
    }

    return <Staff users={usersVal} filter={filterVal} onStartCall={() => {}} canMessage={canMessageVal} />
  })
