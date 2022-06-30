import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PatientMonitor from './PatientMonitor'
import PatientDetails from '../../../Mocks/PatientDetails.mock'

const stories = storiesOf('Provider/v1/Organisms', module)

stories.addDecorator(withKnobs).add('PatientMonitor', () => {
  const unitsOpts = {
    imperial: 'imperial',
    metric: 'metric',
  }
  const unitsVal = select('units', unitsOpts, 'imperial')
  const loadingVal = boolean('loading', false)
  const requestingVal = boolean('requesting', false)
  const featureAllowedVal = boolean('featureAllowed', true)
  const emptyVal = boolean('Empty Vals', false)

  const data = emptyVal ? [] : PatientDetails.user.vitalsReadings

  return (
    <PatientMonitor
      requesting={requestingVal}
      loading={loadingVal}
      readings={data}
      featureAllowed={featureAllowedVal}
      units={unitsVal}
      onClose={action('onBack')}
      onRequest={action('onRequest')}
    />
  )
})
