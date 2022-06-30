import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import OnDemandMessage from './OnDemandMessage'
import data from './mocks/OnDemandMessage.faker'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('OnDemandMessage', () => {
  const user = data.user
  const templates = data.templates

  const loadingNewTranslationLab = 'loadingNewTranslation'
  const loadingNewTranslationDef = false
  const loadingNewTranslationVal = boolean(loadingNewTranslationLab, loadingNewTranslationDef)

  const sentMessageInFlightLab = 'sentMessageInFlight'
  const sentMessageInFlightDef = false
  const sentMessageInFlightVal = boolean(sentMessageInFlightLab, sentMessageInFlightDef)

  const messageTextLab = 'messageText'
  const messageTextDef = ''
  const messageTextVal = text(messageTextLab, messageTextDef)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <OnDemandMessage
        user={user}
        templates={templates}
        messageText={messageTextVal}
        onGetMessageText={e => {
          alert('get message text')
        }}
        onSend={e => {
          alert('send clicked')
        }}
        loadingNewTranslation={loadingNewTranslationVal}
        sentMessageInFlight={sentMessageInFlightVal}
      />
    </div>
  )
})
