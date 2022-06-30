import React from 'react'
import Style from '../../../styles/Style'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import UserCardFavoritePlaceholder from './UserCardFavoritePlaceholder'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('UserCardFavoritePlaceholder', () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: Style.favBackground,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <UserCardFavoritePlaceholder />
    </div>
  )
})
