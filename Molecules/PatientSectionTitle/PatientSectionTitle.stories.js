import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'

import PatientSectionTitle from './PatientSectionTitle'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientSectionTitle', () => {
  const iconLabel = 'icon'
  const options = {
    info: 'info',
    contact: 'contact',
    program: 'program',
    careTeam: 'careTeam',
  }
  const iconDefault = 'info'

  const iconValue = select(iconLabel, options, iconDefault)

  const textLabel = 'text'
  const textDefault = 'Personal Info'
  const textValue = text(textLabel, textDefault)

  const showEditButtonLabel = 'showEditButton'
  const showEditButtonDefault = true
  const showEditButtonValue = boolean(showEditButtonLabel, showEditButtonDefault)

  return (
    <div
      style={{
        height: 100,
        width: 400,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PatientSectionTitle
        icon={iconValue}
        text={textValue}
        showEditButton={showEditButtonValue}
        onEditClick={() => alert('edit clicked')}
      />
    </div>
  )
})
