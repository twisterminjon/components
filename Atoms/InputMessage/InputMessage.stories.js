import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import InputMessage from './InputMessage'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'InputMessage',
  withInfo()(() => {
    const textLabel = 'message'
    const textDefaultValue = 'How are replicants born?'
    const textValue = text(textLabel, textDefaultValue)

    const showLabel = 'show'
    const showDefaultValue = true
    const showValue = boolean(showLabel, showDefaultValue)

    return <InputMessage message={textValue} show={showValue} />
  })
)
