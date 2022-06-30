import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ImageUploadModal from './ImageUploadModal'

const stories = storiesOf('Provider/v1/Molecules', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('ImageUploadModal', () => {
    const title = text('title', 'Some not very long and boring title')
    const loadingVal = boolean('loading', false)

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
        <ImageUploadModal loading={loadingVal} title={title} onClose={action('onClose')} onSave={action('onSave')} />
      </div>
    )
  })
