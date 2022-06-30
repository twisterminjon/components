import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ChooseCallType from './ChooseCallType'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('ChooseCallType', () => {
  const showVal = boolean('show', true)

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
      <ChooseCallType
        show={showVal}
        onCancel={action('cancel')}
        onHandleVideoCallStart={action('video')}
        onHandleAudioCallStart={action('audio')}
      />
    </div>
  )
})
