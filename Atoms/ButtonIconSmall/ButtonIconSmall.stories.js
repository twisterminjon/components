import React from 'react'

import ButtonIconSmall from './ButtonIconSmall'

import CenterView from '../../../storybookUtils/CenterView'

import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

// Some sample icons
import IconCloseX from '../Icons/IconCloseX'
import IconArrowRight from '../Icons/IconArrowRight'
import IconChevronRight from '../Icons/IconChevronRight'
import IconBell from '../Icons/Bell'
import IconCallIncoming from '../Icons/CallIncoming'
import IconVideoCamera from '../Icons/IconVideoCamera'
import IconMessage from '../Icons/IconMessage'
import IconPencil from '../Icons/IconPencil'

const ICONS = {
  IconCloseX,
  IconArrowRight,
  IconChevronRight,
  IconBell,
  IconCallIncoming,
  IconVideoCamera,
  IconMessage,
  IconPencil,
}

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)
stories.addDecorator(getStories => <CenterView inverted>{getStories()}</CenterView>)

stories.add('ButtonIconSmall', () => {
  const iconNames = Object.keys(ICONS)
  const icon = select('Icon', iconNames, iconNames[0])

  return <ButtonIconSmall Icon={ICONS[icon]} />
})
