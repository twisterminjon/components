import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import CaregiverAddToCall from './CaregiverAddToCall'
import { caregivers } from '../../../Mocks/Caregivers.mock'

const stories = storiesOf('Provider/v1/Views', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())

  .add('CaregiverAddToCall', () => {
    const showNoResultsLab = 'Show No Results'
    const showNoResultsDef = false
    const showNoResultsVal = boolean(showNoResultsLab, showNoResultsDef)

    const caregiversVal = showNoResultsVal ? [] : caregivers

    return (
      <CaregiverAddToCall
        caregivers={caregiversVal}
        onStartCall={id => {
          alert(`start call ${id}`)
        }}
        onBack={() => {
          alert('go back to call')
        }}
      />
    )
  })
