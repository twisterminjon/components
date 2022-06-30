import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ImageToast from './ImageToast'

const stories = storiesOf('Provider/v1/Molecules', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('ProfileImageUploadModal / ImageToast', () => {
    const showVal = boolean('show', true)
    const loadingRemoveVal = boolean('loadingRemove', false)

    return (
      <ImageToast
        show={showVal}
        loadingRemove={loadingRemoveVal}
        onSelectImage={action('onSelectImage')}
        onRemoveImage={action('onRemoveImage')}
        onClose={action('onClose')}
      />
    )
  })
