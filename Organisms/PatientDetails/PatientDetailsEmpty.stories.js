import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import PatientDetailsEmpty from './PatientDetailsEmpty'
import data from './PatientDetails.faker'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientDetailsEmpty', () => {
  const user = data.user

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  const sendInviteLoadingLab = 'sendInviteLoading'
  const sendInviteLoadingDef = false
  const sendInviteLoadingVal = boolean(sendInviteLoadingLab, sendInviteLoadingDef)

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
      <PatientDetailsEmpty
        user={user}
        onSave={() => {
          alert('Saving')
        }}
        loading={loadingVal}
        onSendInvite={() => {
          alert('Send Invite')
        }}
        sendInviteLoading={sendInviteLoadingVal}
      />
    </div>
  )
})
