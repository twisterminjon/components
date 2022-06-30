import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import HintText from './HintText'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('HintText', () => {
  const hintLabel = 'hint'
  const hintDefault = 'Psst...I know your secrets'
  const hint = text(hintLabel, hintDefault)

  return <HintText hint={hint} />
})
