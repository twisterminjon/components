import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SettingsForm from './SettingsForm'

const stories = storiesOf('Provider/v1/Organisms', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('SettingsForm', () => {
    const showVal = boolean('show', true)
    const loadingVal = boolean('loading', false)
    const unitsLoadingVal = boolean('unitsLoading', false)

    return (
      <SettingsForm
        show={showVal}
        loading={loadingVal}
        onClose={action('onClose')}
        units="imperial"
        unitsLoading={unitsLoadingVal}
        onUnitsChange={action('onUnitsChange')}
      />
    )
  })
