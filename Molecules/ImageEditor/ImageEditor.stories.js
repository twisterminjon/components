import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ImageEditor from './ImageEditor'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ImageEditor', () => {
  //-------------------------------------------------------------------------
  // NOTE: The onSave action will not work in this story.
  // You will get 'image tainted' error. This is because we can't change the
  // example image we pass in. It's needs to be in our domain
  //-------------------------------------------------------------------------
  const showCircularCropping = boolean('showCircularCropping', true)

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageEditor
        file="https://www.fillmurray.com/600/600"
        onClose={action('onClose')}
        showCircularCropping={showCircularCropping}
        onSave={action('onSave')}
      />
    </div>
  )
})
