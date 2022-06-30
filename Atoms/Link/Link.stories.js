import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import Link from './Link'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories
  .addDecorator(centered)
  .addDecorator(StoryRouter())
  .add(
    'Link',
    withInfo()(() => {
      const textLabel = 'link text'
      const textDefaultValue = 'Go somewhere special'
      const textValue = text(textLabel, textDefaultValue)

      return <Link to="/">{textValue}</Link>
    })
  )
