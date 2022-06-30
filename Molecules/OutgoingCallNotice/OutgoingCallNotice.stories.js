import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import OutgoingCallNotice from './OutgoingCallNotice'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('OutgoingCallNotice', () => {
  const callingNameVal = text('callingName', 'Becky Burrito')
  const showVal = boolean('show', true)
  const showSkipCallVal = boolean('showSkipCall', true)
  const seekingNewCalleeVal = boolean('seekingNewCallee', false)

  const picVal = boolean('Show picture', false)
  const picSource = picVal ? 'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg' : ''

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
      <OutgoingCallNotice
        callingName={callingNameVal}
        profileImage={picSource}
        show={showVal}
        showSkipCall={showSkipCallVal}
        seekingNewCallee={seekingNewCalleeVal}
        onCancel={action('onCancel')}
        onSkip={action('onSkip')}
      />
    </div>
  )
})
