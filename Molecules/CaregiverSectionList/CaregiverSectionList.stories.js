import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import CaregiverSectionList from './CaregiverSectionList'
import { enterprise } from '../../../Mocks/Enterprise.mock'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs).add('CaregiverSectionList', () => {
  const caregivers = enterprise.users.filter(user => user.id === '18')[0].patient.caregivers

  const loadingIdLab = 'loadingId'
  const loadingIdOpts = {
    none: 'none',
    2001: '2001',
    2003: '2003',
  }
  const loadingIdDef = 'none'
  const loadingIdVal = select(loadingIdLab, loadingIdOpts, loadingIdDef)

  return (
    <CaregiverSectionList
      caregivers={caregivers}
      loadingId={loadingIdVal}
      onOdm={id => {
        alert(`odm user id=${id}`)
      }}
      onCall={id => {
        alert(`call user id=${id}`)
      }}
      onMessage={id => {
        alert(`message user id=${id}`)
      }}
      onDelete={id => {
        alert(`delete caregiver id=${id}`)
      }}
    />
  )
})
