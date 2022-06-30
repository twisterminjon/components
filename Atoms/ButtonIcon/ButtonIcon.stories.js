import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import ButtonIcon from './ButtonIcon'
import IconEllipsisV from '../../Atoms/Icons/IconEllipsisV'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ButtonIcon', () => {
  return (
    <ButtonIcon
      onClick={() => {
        alert('clicked')
      }}>
      <IconEllipsisV color="white" size={25} />
    </ButtonIcon>
  )
})
