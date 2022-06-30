import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'

import ProgramTagSection from './ProgramTagSection'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ProgramTagSection', () => {
  const allPrograms = [
    { id: '1', name: 'Hulk' },
    { id: '2', name: 'Wolverine' },
    { id: '3', name: 'Deadpool' },
    { id: '4', name: 'Ironman' },
    { id: '5', name: 'Thor' },
    { id: '6', name: 'Captain America' },
    { id: '7', name: 'Star-Lord' },
    { id: '8', name: 'Rocket' },
  ]

  const enrolledPrograms = [
    { id: '11', program: { id: '1', name: 'Hulk', isActive: true } },
    { id: '21', program: { id: '2', name: 'Wolverine', isActive: true } },
    { id: '41', program: { id: '4', name: 'Ironman', isActive: false } },
    { id: '61', program: { id: '6', name: 'Captain America', isActive: true } },
    { id: '81', program: { id: '8', name: 'Rocket', isActive: true } },
  ]

  const titlePaneLab = 'titlePane'
  const titlePaneDef = 'Pick a hero'
  const titlePaneVal = text(titlePaneLab, titlePaneDef)

  const showSelectPaneLab = 'showSelectPane'
  const showSelectPaneDef = false
  const showSelectPaneVal = boolean(showSelectPaneLab, showSelectPaneDef)

  return (
    <div style={{ width: 400 }}>
      <ProgramTagSection
        title={titlePaneVal}
        enrolledPrograms={enrolledPrograms}
        allPrograms={allPrograms}
        showSelectPane={showSelectPaneVal}
        onChange={action('onChange')}
        onClose={action('onClose')}
        onAdd={action('onAdd')}
        onEdit={action('onEdit')}
      />
    </div>
  )
})
