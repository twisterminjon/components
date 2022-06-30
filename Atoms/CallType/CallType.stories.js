import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import CallType from './CallType'
import Call from './CallType'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('CallType', () => {
  const typeOpts = {
    incoming: 'INCOMING',
    outgoing: 'OUTGOING',
  }
  const typeVal = select('type', typeOpts, Call.incoming)
  const dimmedVal = boolean('dimmed', false)
  const missedVal = boolean('missed', false)

  return <CallType type={typeVal} dimmed={dimmedVal} missed={missedVal} />
})
