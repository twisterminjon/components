import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import BackToCallHeader from './BackToCallHeader'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories
  .addDecorator(centered)
  .add('BackToCallHeader', () => <BackToCallHeader title={text('title', 'Staff')} onBack={action('onBack')} />)
