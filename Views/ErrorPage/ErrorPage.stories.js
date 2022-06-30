import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import ErrorPage from './ErrorPage'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('ErrorPage', () => {
  const codeLabel = 'code'
  const codeDefaultValue = 'server_error'
  const codeValue = text(codeLabel, codeDefaultValue)

  const messageLabel = 'message'
  const messageDefaultValue = "TypeError: Cannot read property 'name' of undefined"
  const messageValue = text(messageLabel, messageDefaultValue)

  return (
    <div
      style={{
        backgroundImage: 'url("https://picsum.photos/500/500/?random")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <ErrorPage code={codeValue} message={messageValue} />
    </div>
  )
})
