import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import TagCloud from './TagCloud'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TagCloud', () => {
  const tags = [
    { id: '1', name: 'Fantastic Four', isActive: true },
    { id: '2', name: 'X-Men', isActive: true },
    { id: '3', name: 'Justice League of America', isActive: true },
    { id: '4', name: 'The Avengers', isActive: false },
    { id: '5', name: 'Batman/Superman', isActive: true },
  ]

  const verticalVal = boolean('vertical', false)
  const loadingVal = boolean('loading', false)

  return (
    <div style={{ width: 400 }}>
      <TagCloud
        loading={loadingVal}
        tags={tags}
        vertical={verticalVal}
        onTagDelete={(id, name) => {
          alert(`delete tag ${id}-${name}`)
        }}
      />
    </div>
  )
})
