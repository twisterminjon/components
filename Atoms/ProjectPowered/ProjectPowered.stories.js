import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import ProjectPowered from './ProjectPowered'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('ProjectPowered', () => {
  return (
    <div style={{ width: '200px', backgroundColor: 'black', textAlign: 'center' }}>
      <ProjectPowered />
    </div>
  )
})
