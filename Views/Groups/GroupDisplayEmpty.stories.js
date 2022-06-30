import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import GroupDisplayEmpty from './GroupDisplayEmpty'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories
  .addDecorator(StoryRouter())

  .add('GroupDisplayEmpty', () => {
    return (
      <GroupDisplayEmpty
        name="The despair"
        onGoBack={() => {
          alert('onGoBack')
        }}
      />
    )
  })
