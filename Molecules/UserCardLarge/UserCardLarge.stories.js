import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import UserCardLarge from './UserCardLarge'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('UserCardLarge', () => {
  const textLabel = 'userName'
  const textDefaultValue = 'Dr. Strange'
  const textValue = text(textLabel, textDefaultValue)

  const titleLabel = 'title'
  const titleDefaultValue = 'Cardiology Department'
  const titleValue = text(titleLabel, titleDefaultValue)

  const actionTextLabel = 'actionText'
  const actionTextDefaultValue = 'Incoming Call'
  const actionTextValue = text(actionTextLabel, actionTextDefaultValue)

  const picLabel = 'Show picture'
  const picDefaultValue = true
  const picValue = boolean(picLabel, picDefaultValue)
  const picSource = picValue ? 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg' : ''

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      }}>
      <UserCardLarge userName={textValue} title={titleValue} profileImage={picSource} actionText={actionTextValue} />
    </div>
  )
})
