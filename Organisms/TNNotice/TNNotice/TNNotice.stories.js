import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import TNNotice from './TNNotice'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('TNNotice', () => {
  const typeLab = 'type'
  const typeDef = ['welcome', 'update']
  const typeValue = select(typeLab, typeDef)

  return <TNNotice type={typeValue} onContinue={() => alert('clicked continue')} />
})
