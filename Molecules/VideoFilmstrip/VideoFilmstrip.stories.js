import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import VideoFilmstrip from './VideoFilmstrip'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoFilmstrip', () => {
  const showAddCallerLabel = 'Add caller'
  const showAddCallerDefaultValue = false
  const showAddCallerValue = boolean(showAddCallerLabel, showAddCallerDefaultValue)

  let placeholder = undefined
  if (showAddCallerValue) {
    placeholder = [
      {
        displayName: 'Sally',
      },
      {
        displayName: 'Wanda',
      },
    ]
  } else {
    placeholder = []
  }

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
      <VideoFilmstrip remotes={null} callingPlaceholders={placeholder} />
    </div>
  )
})
