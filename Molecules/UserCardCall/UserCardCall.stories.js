import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import UserCardCall from './UserCardCall'
import UsersQl from '../../../services/UsersQl'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

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

const stories = storiesOf('Provider/v1/Molecules', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MockedProvider mocks={mocks} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .addDecorator(centered)
  .add('UserCardCall', () => {
    const displayNameLabel = 'displayName'
    const displayNameDefaultValue = 'Dr. Strange'
    const displayNameValue = text(displayNameLabel, displayNameDefaultValue)

    const picLabel = 'Show picture'
    const picDefaultValue = true
    const picValue = boolean(picLabel, picDefaultValue)
    const picSource = picValue ? 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg' : ''

    const favoriteLabel = 'favorite'
    const favoriteDefaultValue = false
    const favoriteValue = boolean(favoriteLabel, favoriteDefaultValue)

    const statusLabel = 'Status'
    const statusOptions = {
      available: USER_STATUS_AVAILABLE,
      busy: USER_STATUS_BUSY,
      away: USER_STATUS_AWAY,
      offline: USER_STATUS_OFFLINE,
    }
    const statusDefaultValue = USER_STATUS_AVAILABLE
    const statusValue = select(statusLabel, statusOptions, statusDefaultValue)

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
        <UserCardCall
          displayName={displayNameValue}
          profileImage={picSource}
          favorite={favoriteValue}
          status={statusValue}
          onFavoriteClick={() => {
            alert('fav clicked')
          }}
          onCallClick={() => {
            // alert('call clicked')
          }}
        />
      </div>
    )
  })
