import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'

import ThreadAddUser from './ThreadAddUser'
import thread from '../../../Mocks/Thread.mock'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('ThreadAddUser', () => {
  return (
    <ThreadAddUser
      users={thread.addMembers}
      onShowGroups={() => {
        alert('onShowGroups')
      }}
      onAddUser={() => {
        alert('onAddUser')
      }}
      onBack={() => {
        alert('onBack')
      }}
      onSearchChange={searchValue => alert(`onSearchChange(${searchValue})`)}
      loading={boolean('loading', false)}
      pageNumber={number('pageNumber', 0)}
      onPageNumberChange={pageNumber => alert(`onPageNumberChange(${pageNumber})`)}
    />
  )
})
