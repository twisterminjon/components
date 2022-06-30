import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { MockedProvider } from '@apollo/react-testing'

import PatientCaregivers from './PatientCaregivers'
import { enterprise } from '../../../Mocks/Enterprise.mock'
import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'

import AuthQl from '../../../services/AuthQl'

const mocksGetAccessCode = [
  {
    request: {
      query: AuthQl.generateAccessCode(),
      variables: {
        id: '16',
      },
    },
    result: {
      data: {
        user: {
          idid: '16',
          accessCode: {
            id: '23',
            code: '12345',
            isExpired: false,
          },
        },
      },
    },
  },
]

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories
  .addDecorator(story => (
    <MockedProvider mocks={mocksGetAccessCode} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .addDecorator(StoryRouter())
  .add('PatientCaregivers', () => {
    const user = enterprise.users.filter(user => user.id === '18')[0]

    const allCaregivers = enterprise.users.filter(user => user.isCaregiver)
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
        <CurrentUserContext.Provider value={currentUser}>
          <PatientCaregivers
            user={user}
            caregiversLookup={allCaregivers}
            onSave={e => {
              const message = e.map(p => p.name)
              alert(message)
            }}
            onMessage={id => {
              alert(`message user id=${id}`)
            }}
            onOdm={id => {
              alert(`odm user id=${id}`)
            }}
            onCall={id => {
              alert(`call user id=${id}`)
            }}
            onSearch={val => {
              alert(`search for ${val}`)
            }}
            onAddNewCaregiver={() => {
              alert('add new caregiver')
            }}
            onResend={() => {
              alert('resend invite')
            }}
          />
        </CurrentUserContext.Provider>
      </div>
    )
  })
