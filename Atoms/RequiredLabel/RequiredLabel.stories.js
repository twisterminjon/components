import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import RequiredLabel from './RequiredLabel'

const stories = storiesOf('Provider/v1/Atoms', module)

stories.addDecorator(centered).add('RequiredLabel', () => {
  return <RequiredLabel />
})
