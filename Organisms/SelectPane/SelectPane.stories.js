import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import SelectPane from './SelectPane'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('SelectPane', () => {
  const items = [
    {
      id: '123',
      name: 'Dr. Stephen Strange',
    },

    {
      id: '4',
      name: 'Nurse Jacky',
    },

    {
      id: '5',
      name: 'Dr. Douglas Powers',
    },

    {
      id: '1263',
      name: 'Una Brow',
    },
    {
      id: '64',
      name: 'Dr. Douglas Powers',
    },

    {
      id: '12634',
      name: 'Una Brow',
    },
  ]

  const loading = boolean('loading', false)

  return (
    <SelectPane
      items={items}
      onClose={() => {
        alert('Close')
      }}
      onSelect={id => {
        alert(`Clicked ${id}`)
      }}
      loading={loading}
    />
  )
})
