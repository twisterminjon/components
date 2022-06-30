import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import FavBar from './FavBar'

const users = [
  {
    id: '123',
    displayName: 'Dr. Stephen Strange',
    profileImage: 'https://www.fillmurray.com/60/60',
    overallStatus: 'available',
  },
  {
    id: '4',
    displayName: 'NurseJackyNurseJackyNurseJackyNurseJacky',
    profileImage: 'https://www.fillmurray.com/100/100',
    overallStatus: 'busy',
  },

  {
    id: '5',
    displayName: 'Dr.Douglas Powers',
    profileImage: 'https://www.fillmurray.com/160/160',
    overallStatus: 'busy',
  },
  {
    id: '1263',
    displayName: 'Una Brow',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'available',
  },
  {
    id: '64',
    displayName: 'Dr. Douglas Powers',
    profileImage: 'https://www.fillmurray.com/160/160',
    overallStatus: 'offline',
  },
  {
    id: '12634',
    displayName: 'Una Brow',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'away',
  },
  {
    id: '123',
    displayName: 'Dr. Stephen Strange',
    profileImage: 'https://www.fillmurray.com/60/60',
    overallStatus: 'available',
  },
  {
    id: '4',
    displayName: 'NurseJackyNurseJackyNurseJackyNurseJacky',
    profileImage: 'https://www.fillmurray.com/100/100',
    overallStatus: 'busy',
  },

  {
    id: '5',
    displayName: 'Dr.Douglas Powers',
    profileImage: 'https://www.fillmurray.com/160/160',
    overallStatus: 'busy',
  },
  {
    id: '1263',
    displayName: 'Una Brow',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'available',
  },
  {
    id: '64',
    displayName: 'Dr. Douglas Powers',
    profileImage: 'https://www.fillmurray.com/160/160',
    overallStatus: 'offline',
  },
  {
    id: '12634',
    displayName: 'Una Brow',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'away',
  },
]

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.add('FavBar', () => {
  const messagesEnabledLabel = 'messagesEnabled'
  const messagesEnabledDefault = false
  const messagesEnabledValue = boolean(messagesEnabledLabel, messagesEnabledDefault)

  const loadingLabel = 'loading'
  const loadingDefault = false
  let loadingValue = boolean(loadingLabel, loadingDefault)

  const emptyLabel = 'Show Placeholder'
  const emptyDefault = false
  const emptyValue = boolean(emptyLabel, emptyDefault)

  return (
    <FavBar
      users={emptyValue ? [] : users}
      loading={emptyValue ? false : loadingValue}
      messagesEnabled={messagesEnabledValue}
      onCall={user => {
        alert(`call user: ${user.displayName}`)
      }}
      onMessage={user => {
        alert(`message user: ${user.displayName}`)
      }}
    />
  )
})
