import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'

import PatientButton from './PatientButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientButton', () => {
  const labelLabel = 'label'
  const labelDefault = 'Edit'
  const labelValue = text(labelLabel, labelDefault)

  const iconLabel = 'icon'
  const iconOpts = {
    none: 'none',
    edit: 'edit',
    envelope: 'envelope',
  }
  const iconDefault = 'edit'
  let iconValue = select(iconLabel, iconOpts, iconDefault)
  if (iconValue === 'none') iconValue = ''

  const disabledLabel = 'disabled'
  const disabledDefault = false
  const disabledValue = boolean(disabledLabel, disabledDefault)

  const loadingLabel = 'loading'
  const loadingDefault = false
  const loadingValue = boolean(loadingLabel, loadingDefault)

  return (
    <PatientButton
      disabled={disabledValue}
      onClick={() => {
        alert('clicked')
      }}
      icon={iconValue}
      label={labelValue}
      loading={loadingValue}
    />
  )
})
