import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import RadioLabel from './RadioLabel'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('RadioLabel', () => {
  const isChecked = boolean('isChecked', true)

  return (
    <div
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <RadioLabel isChecked={isChecked} onClick={action('clicked')}>
        <span style={{ color: 'white' }}>Option 1</span>
      </RadioLabel>
    </div>
  )
})
