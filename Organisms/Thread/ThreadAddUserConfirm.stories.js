import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ThreadAddUserConfirm from './ThreadAddUserConfirm'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)

stories.addDecorator(withKnobs).add('ThreadAddUserConfirm', () => {
  const displayNameVal = text('displayName', 'PJ Harvey')
  const showVal = boolean('show', true)

  return (
    <ThreadAddUserConfirm
      displayName={displayNameVal}
      show={showVal}
      onAdd={action('onAdd')}
      onClose={action('onClose')}
    />
  )
})
