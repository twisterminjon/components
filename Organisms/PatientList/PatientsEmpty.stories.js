import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import PatientsEmpty from './PatientsEmpty'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientsEmpty', () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      }}>
      <PatientsEmpty />
    </div>
  )
})
