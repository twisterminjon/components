import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { MockedProvider } from '@apollo/react-testing'

import CaregiverMenu from './CaregiverMenu'
import data from '../../../Mocks/PatientDetails.mock'

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
          id: '16',
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

stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MockedProvider mocks={mocksGetAccessCode} addTypeName={false}>
      {story()}
    </MockedProvider>
  ))
  .add('CaregiverMenu', () => {
    const showVal = boolean('show', true)
    const resendLoadingVal = boolean('resendLoading', false)

    return (
      <CaregiverMenu
        user={data.user}
        show={showVal}
        onResend={() => {
          alert('onResend')
        }}
        onEdit={() => {
          alert('onEdit')
        }}
        onUnassign={() => {
          alert('onUnassign')
        }}
        onCancel={() => {
          alert('onCancel')
        }}
        resendLoading={resendLoadingVal}
      />
    )
  })
