import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import BackToCallButton from './BackToCallButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('BackToCallButton', () => {
  return <BackToCallButton onClick={() => alert('Returning back')} />
})
