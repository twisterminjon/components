import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Meter from './Meter'

const stories = storiesOf('Provider/v1/Views', module)

stories.addDecorator(withKnobs).add('PatientMonitor / Meter', () => {
  const valueVal = text('value', '37.2')
  const labelVal = text('label', 'temp (c)')

  return <Meter value={valueVal} label={labelVal} />
})
