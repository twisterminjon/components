import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CenterView from '../../../storybookUtils/CenterView'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import TagUser from './TagUser'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView inverted>{getStory()}</CenterView>)
  .add('TagUser', () => {
    const displayName = text('displayName', 'Dr. Strange')
    const showProfileImage = boolean('showProfileImage', true)
    const profileImage = showProfileImage ? 'https://www.fillmurray.com/100/100' : ''

    return <TagUser displayName={displayName} onClick={action('onClick')} profileImage={profileImage} />
  })
