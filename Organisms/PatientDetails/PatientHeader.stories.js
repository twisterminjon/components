import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PatientHeader from './PatientHeader'
import { enterprise } from '../../../Mocks/Enterprise.mock'
import { CurrentUserContext } from '@shared/providers'
import { currentUser } from '../../../Mocks/CurrentUser.mock'
import UsersQl from '../../../services/UsersQl'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const mocks = [
  {
    request: {
      query: UsersQl.updateProfilePic(),
      variables: {
        userId: '18',
        file: '',
      },
    },
    result: {
      data: {
        uploadProfileImageUser: {
          id: '2',
          profileImage: '',
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
  .add('PatientHeader', () => {
    const user = enterprise.users.filter(user => user.id === '18')[0]

    const loadingVal = boolean('loading', false)

    const statusOptions = {
      available: USER_STATUS_AVAILABLE,
      busy: USER_STATUS_BUSY,
      away: USER_STATUS_AWAY,
      offline: USER_STATUS_OFFLINE,
    }
    user.overallStatus = select('overallStatus', statusOptions, 'available')

    user.emailOptOut = boolean('emailOptOut', false)
    user.smsOptOut = boolean('smsOptOut', false)

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <PatientHeader
          user={user}
          loading={loadingVal}
          onProfilePicChange={action('onProfilePicChange')}
          onCall={action('onCall')}
          onMessage={action('onMessage')}
          onOnDemandMessage={action('onOnDemandMessage')}
        />
      </CurrentUserContext.Provider>
    )
  })
