import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import CaregiverResults from './CaregiverResults'
import { caregivers } from '../../../Mocks/Caregivers.mock'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.add('CaregiverResults', () => {
  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  const notFoundLab = 'show notFound'
  const notFoundDef = false
  const notFoundVal = boolean(notFoundLab, notFoundDef)

  const caregiversVal = notFoundVal ? [] : caregivers

  return (
    <CaregiverResults
      loading={loadingVal}
      caregivers={caregiversVal}
      onAdd={() => {
        alert('Adding stuff')
      }}
    />
  )
})
