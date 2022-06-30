import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PatientTeam from './PatientTeam'
import data from './PatientDetails.faker'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientTeam', () => {
  const user = data.user

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  const requiredLab = 'required'
  const requiredDef = false
  const requiredVal = boolean(requiredLab, requiredDef)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      }}>
      <PatientTeam user={user} onSave={action('onSave')} loading={loadingVal} required={requiredVal} />
    </div>
  )
})
