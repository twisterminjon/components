import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import AddCallButton from './AddCallButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('AddCallButton', () => {
  const showLabelLabel = 'showLabel'
  const showLabelDefault = true
  const showLabelValue = boolean(showLabelLabel, showLabelDefault)
  const showMaxReached = boolean('showMaxReached', true)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'violet',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AddCallButton
        showLabel={showLabelValue}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={() => alert('adding staff')}
        onAddCaregiver={() => alert('adding caregiver')}
        onAddInterpreter={() => alert('adding interpreter')}
        canAddMoreParticipants={showMaxReached}
      />
    </div>
  )
})
