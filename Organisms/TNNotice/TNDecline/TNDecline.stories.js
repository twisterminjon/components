import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import TNDecline from './TNDecline'

const stories = storiesOf('Provider/v1/Organisms', module)

stories.addDecorator(StoryRouter()).add('TNDecline', () => {
  return <TNDecline onReturn={() => alert('clicked Return')} onCloseApp={() => alert('clicked close app')} />
})
