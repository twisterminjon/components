import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, object } from '@storybook/addon-knobs'

import SelectPaneItem from './SelectPaneItem'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('SelectPaneItem', () => {
  const nameVal = object('item', {
    name: 'Enterprise - Parent Organization',
    id: '1',
  })

  const onSelect = () => alert(`Select item`)

  return (
    <div style={{ backgroundColor: '#8ba9d9', width: '500px' }}>
      <SelectPaneItem item={nameVal} onSelect={onSelect} />
    </div>
  )
})
