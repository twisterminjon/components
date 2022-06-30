import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import VideoSmallAddCaller from './VideoSmallAddCaller'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoSmallAddCaller', () => {
  const displayNameLabel = 'displayName'
  const displayNameDefault = 'Dr. Watson'
  const displayNameValue = text(displayNameLabel, displayNameDefault)

  const showDeclineLabel = 'showDecline'
  const showDeclineOptions = {
    calling: 'Invite',
    declined: 'Declined',
  }
  const showDeclineDefault = 'Calling'

  const showDeclineValue = select(showDeclineLabel, showDeclineOptions, showDeclineDefault)
  const declined = showDeclineValue === 'declined' ? true : false

  return (
    <div
      style={{
        backgroundImage: 'url("https://picsum.photos/500/500/?random")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <VideoSmallAddCaller displayName={displayNameValue} showDeclined={declined} />
    </div>
  )
})
