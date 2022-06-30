import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import ConfirmButtons from './ConfirmButtons'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ConfirmButtons', () => {
  const loadingName = 'loading'
  const loadingDefault = false
  const loadingValue = boolean(loadingName, loadingDefault)

  return (
    <div style={{ width: 400 }}>
      <ConfirmButtons
        loading={loadingValue}
        onCancel={() => {
          alert('Cancel Clicked')
        }}
      />
    </div>
  )
})
