import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ProfileImageUploadModal from './ProfileImageUploadModal'

const stories = storiesOf('Provider/v1/Molecules', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('ProfileImageUploadModal / main', () => {
    const showVal = boolean('show', true)
    const showOptionsVal = boolean('showOptions', false)
    const loadingVal = boolean('loading', false)
    const loadingRemoveVal = boolean('loadingRemove', false)

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
        <ProfileImageUploadModal
          showOptions={showOptionsVal}
          show={showVal}
          loading={loadingVal}
          loadingRemove={loadingRemoveVal}
          onClose={action('onClose')}
          onSave={action('onSave')}
          onRemove={action('onRemove')}
        />
      </div>
    )
  })
