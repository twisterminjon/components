import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ProfilePicEdit from './ProfilePicEdit'

const stories = storiesOf('Provider/v1/Molecules', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('ProfilePicEdit', () => {
    const loadingVal = boolean('loading', false)
    const disabledVal = boolean('disabled', false)

    const picValue = boolean('profileImage', true)
    const picSource = picValue ? 'https://www.fillmurray.com/300/300' : ''

    return (
      <ProfilePicEdit
        loading={loadingVal}
        profileImage={picSource}
        disabled={disabledVal}
        onClick={action('onClick')}
      />
    )
  })
