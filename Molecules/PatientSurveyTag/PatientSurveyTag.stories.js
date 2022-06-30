import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import PatientSurveyTag from './PatientSurveyTag'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientSurveyTag', () => {
  const name = text('name', 'Test Assessment')
  const id = text('id', '1')
  const active = boolean('active', true)
  const started = boolean('started', false)
  const interventionRequired = boolean('interventionRequired', false)

  return (
    <div style={{ width: 547 }}>
      <PatientSurveyTag
        name={name}
        id={id}
        active={active}
        started={started}
        interventionRequired={interventionRequired}
        onTagDelete={() => alert('onTagDelete')}
        onIntervention={id => alert(`onIntervention(${id})`)}
      />
    </div>
  )
})
