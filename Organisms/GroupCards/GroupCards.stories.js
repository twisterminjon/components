import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import GroupCards from './GroupCards'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.add('GroupCards', () => {
  const groups = [
    {
      id: '1',
      name: 'Cholera Infantum',
    },
    {
      id: '2',
      name: 'Malaria',
    },
    {
      id: '3',
      name: 'Diphtheria',
    },
    {
      id: '4',
      name: 'Typhoid Fever',
    },
    {
      id: '5',
      name: 'Puerperal Fever',
    },
    {
      id: '6',
      name: 'Tuberculosis',
    },
    {
      id: '7',
      name: 'Erysipelas',
    },
    {
      id: '8',
      name: 'Consumption',
    },
  ]
  return (
    <GroupCards
      groups={groups}
      onGroupClick={e => {
        alert('group clicked: ' + e)
      }}
    />
  )
})
