import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import StoryRouter from 'storybook-react-router'

import InterpreterCard from './InterpreterCard'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('InterpreterCard', () => {
  const disabled = boolean('disabled', true)
  const name = text('name', 'English')

  return <InterpreterCard disabled={disabled} onClick={action('onClick')} name={name} />
})
