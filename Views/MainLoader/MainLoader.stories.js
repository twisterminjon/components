import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import MainLoader from './MainLoader'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('MainLoader', () => {
  return <MainLoader />
})
