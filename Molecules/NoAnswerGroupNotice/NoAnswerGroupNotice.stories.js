import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import NoAnswerGroupNotice from './NoAnswerGroupNotice'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('NoAnswerGroupNotice', () => {
  const textLabel = 'userName'
  const textDefaultValue = 'Becky Burrito'
  const textValue = text(textLabel, textDefaultValue)

  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

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
      <NoAnswerGroupNotice callingName={textValue} show={showValue} onCancel={() => {}} onRetry={() => {}} />
    </div>
  )
})
