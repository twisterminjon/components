import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import Loader from './Loader'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('Loader', () => {
  const textLabel = 'label'
  const textDefaultValue = 'Loading'
  const textValue = text(textLabel, textDefaultValue)

  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  return <Loader show={showValue} label={textValue} />
})
