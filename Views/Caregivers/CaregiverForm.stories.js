import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import CaregiverForm from './CaregiverForm'
import { enterprise } from '../../../Mocks/Enterprise.mock'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('CaregiverForm', () => {
  const user = enterprise.users.filter(user => user.id === '19')
  const patientLookups = enterprise.users.filter(user => user.isPatient)

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  const addingLab = 'adding'
  const addingDef = false
  const addingVal = boolean(addingLab, addingDef)

  return (
    <CaregiverForm
      user={user[0]}
      patientsLookup={patientLookups}
      loading={loadingVal}
      adding={addingVal}
      onSave={() => {
        alert('onSave')
      }}
      onAdd={() => {
        alert('onAdd')
      }}
      onCancel={() => {
        alert('onCancel')
      }}
      // for RR
      location={{ pathname: '/app/caregivers/add' }}
      match={{ params: { patientId: '1' } }}
    />
  )
})
