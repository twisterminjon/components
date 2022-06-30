import React from 'react'
import { MockedProvider } from '@apollo/react-testing'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import GroupDisplay from './GroupDisplay'
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
stories.addDecorator(withKnobs)

stories
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .add('GroupDisplay', () => {
    const group = {
      id: '1',
      name: 'Gaggle Department',
      users: [
        {
          id: '2',
          displayName: 'Dr. Giggle',
          profileImage: 'https://www.fillmurray.com/g/600/600',
          overallStatus: 'available',
          favorite: false,
        },
        {
          id: '3',
          displayName: 'Dr. GabbleDuck',
          profileImage: 'https://www.fillmurray.com/g/400/400',
          overallStatus: 'busy',
          favorite: true,
        },
        {
          id: '4',
          displayName: 'Dr. Gobble',
          profileImage: '',
          overallStatus: 'offline',
          favorite: false,
        },
      ],
      enterprise: {
        id: '134dfs',
        name: 'some name',
      },
    }

    const canMessageValue = boolean('canMessage', true)

    return (
      <GroupDisplay
        group={group}
        onGoBack={() => {
          alert('onGoBack')
        }}
        onGroupCall={() => {
          alert('onGroupCall')
        }}
        onCallUser={() => {
          alert('onCallUser')
        }}
        canMessage={canMessageValue}
        available={boolean('available', true)}
        loading={boolean('loading', false)}
        pageNumber={number('pageNumber', 0)}
        onPageNumberChange={pageNumber => alert(`onPageNumberChange(${pageNumber})`)}
      />
    )
  })
