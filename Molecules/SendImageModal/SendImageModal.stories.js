import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { LoadPicture } from '@shared/components/src/Molecules/Cropper/Cropper.stories'
import SendImageModal from './SendImageModal'

const stories = storiesOf('Provider/v1/Molecules', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('SendImageModal', () => (
    <LoadPicture url="https://picsum.photos/500/500/?random">
      {({ file }) => (
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
          <SendImageModal show={Boolean(file)} file={file} onSend={action('onSend')} onClose={action('onClose')} />
        </div>
      )}
    </LoadPicture>
  ))
