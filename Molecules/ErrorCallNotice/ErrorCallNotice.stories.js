import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ErrorCallNotice from './ErrorCallNotice'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('ErrorCallNotice', () => {
  const errorMsg = text('errorMsg', 'There was an error during your call. The magic gnome did not showed up')
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
      <ErrorCallNotice errorMsg={errorMsg} show={showVal} onCancel={action('onCancel')} />
    </div>
  )
})
