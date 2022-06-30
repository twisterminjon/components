import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import PatientNew from './PatientNew'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientNew', () => {
  const languages = [
    {
      id: '1',
      code: 'EN',
      name: 'English',
    },
    {
      id: '2',
      code: 'SP',
      name: 'Spanish',
    },
  ]

  const location = { state: { enterpriseId: '1' } }
  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  const teamRequiredLab = 'teamRequired'
  const teamRequiredDef = false
  const teamRequiredVal = boolean(teamRequiredLab, teamRequiredDef)

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
      <PatientNew
        enterpriseId="1"
        enterpriseLanguage="EN"
        onSave={() => {
          alert('saving')
        }}
        onCancel={() => {
          alert('canceled')
        }}
        loading={loadingVal}
        languages={languages}
        location={location}
        teamRequired={teamRequiredVal}
      />
    </div>
  )
})
