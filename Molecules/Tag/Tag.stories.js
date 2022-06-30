import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import Tag from './Tag'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Tag', () => {
  const labelLabel = 'label'
  const labelDefaultValue = 'D-list super heros'
  const labelValue = text(labelLabel, labelDefaultValue)

  const inActiveLabel = 'inActive'
  const inActiveDefaultValue = false
  const inActiveValue = boolean(inActiveLabel, inActiveDefaultValue)

  return (
    <Tag
      id="1"
      label={labelValue}
      inActive={inActiveValue}
      onDelete={() => {
        alert('delete clicked')
      }}
    />
  )
})
