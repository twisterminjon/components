import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import PatientCareTeams from './PatientCareTeams'

import data from '../../../Mocks/PatientDetails.mock'
import { enterpriseLookups } from '../../../Mocks/EnterpriseLookups.mock'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientCareTeams', () => {
  const user = data.user
  const careTeams = enterpriseLookups.enterprise.roles

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
      <PatientCareTeams
        user={user}
        careTeamsLookup={careTeams}
        onSave={e => {
          const message = e.map(p => p.name)
          alert(message)
        }}
      />
    </div>
  )
})
