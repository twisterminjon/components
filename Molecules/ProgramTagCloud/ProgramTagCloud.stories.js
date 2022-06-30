import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import ProgramTagCloud from './ProgramTagCloud'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ProgramTagCloud', () => {
  const tags = [
    { id: '11', program: { id: '1', name: 'Fantastic Four', isActive: true } },
    { id: '21', program: { id: '2', name: 'X-Men', isActive: true } },
    {
      id: '31',
      program: { id: '3', name: 'Justice League of America', isActive: true },
    },
    { id: '41', program: { id: '4', name: 'The Avengers', isActive: false } },
    { id: '51', program: { id: '5', name: 'Batman/Superman', isActive: true } },
  ]

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

  return (
    <div style={{ width: 400 }}>
      <ProgramTagCloud tags={tags} loading={loadingVal} />
    </div>
  )
})
