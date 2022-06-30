import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import EnterpriseLogo from './EnterpriseLogo'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('EnterpriseLogo', () => {
  const picLabel = 'Show image'
  const picDefaultValue = true
  const picValue = boolean(picLabel, picDefaultValue)

  const picSource = picValue ? 'https://www.fillmurray.com/600/200' : ''

  return <EnterpriseLogo imgUrl={picSource} />
})
