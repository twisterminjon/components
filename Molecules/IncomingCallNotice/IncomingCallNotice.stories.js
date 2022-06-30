import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import IncomingCallNotice from './IncomingCallNotice'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('IncomingCallNotice', () => {
  const textLabel = 'userName'
  const textDefaultValue = 'Sally Sandwich'
  const textValue = text(textLabel, textDefaultValue)

  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const picLabel = 'Show picture'
  const picDefaultValue = false
  const picValue = boolean(picLabel, picDefaultValue)
  const picSource = picValue ? 'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg' : ''

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
      <IncomingCallNotice
        callerName={textValue}
        show={showValue}
        onAnswer={() => {}}
        onIgnore={() => {}}
        profileImage={picSource}
      />
    </div>
  )
})
