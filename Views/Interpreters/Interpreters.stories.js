import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import StoryRouter from 'storybook-react-router'

import Interpreters from './Interpreters'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('Interpreters', () => {
  const languages = [
    {
      id: 'spanish',
      name: 'Spanish',
    },
    {
      id: 'arabic',
      name: 'Arabic',
    },
    {
      id: 'english',
      name: 'English',
    },
    {
      id: 'punjabi',
      name: 'Punjabi',
    },
    {
      id: 'hindi',
      name: 'Hindi',
    },
    {
      id: 'chinese',
      name: 'Chinese',
    },
    {
      id: 'bengali',
      name: 'Bengali',
    },
    {
      id: 'japanese',
      name: 'Japanese',
    },
  ]

  return <Interpreters languages={languages} onStartCall={action('onStartCall')} />
})
