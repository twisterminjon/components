import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import PatientContact from './PatientContact'
import data from './PatientDetails.faker'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientContact', () => {
  const user = data.user

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

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

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
      <PatientContact
        user={user}
        languages={languages}
        onSave={() => {
          alert('onSave')
        }}
        loading={loadingVal}
      />
    </div>
  )
})
