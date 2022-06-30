import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import CaregiverSectionMgr from './CaregiverSectionMgr'
import { enterprise } from '../../../Mocks/Enterprise.mock'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs).add('CaregiverSectionMgr', () => {
  const user = enterprise.users.filter(user => user.id === '18')[0]
  const caregivers = user.patient.caregivers

  return (
    <CaregiverSectionMgr
      user={user}
      caregivers={caregivers}
      onOdm={id => {
        alert(`odm user id=${id}`)
      }}
      onCall={id => {
        alert(`call user id=${id}`)
      }}
      onMessage={id => {
        alert(`message user id=${id}`)
      }}
      onRemove={e => {
        alert(`removing enrollment id: ${e}`)
      }}
    />
  )
})
