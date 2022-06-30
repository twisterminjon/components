import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import TagSection from './TagSection'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TagSection', () => {
  const marvelPossibleTags = [
    { id: '1', name: 'Hulk' },
    { id: '2', name: 'Wolverine' },
    { id: '3', name: 'Deadpool' },
    { id: '4', name: 'Ironman' },
    { id: '5', name: 'Thor' },
    { id: '6', name: 'Captain America' },
    { id: '7', name: 'Star-Lord' },
    { id: '8', name: 'Rocket' },
  ]

  const marvelTags = [
    { id: '1', name: 'Hulk' },
    { id: '2', name: 'Wolverine' },
    { id: '4', name: 'Ironman' },
    { id: '6', name: 'Captain America' },
    { id: '8', name: 'Rocket' },
  ]

  const titlePaneLab = 'titlePane'
  const titlePaneDef = 'Pick a hero'
  const titlePaneVal = text(titlePaneLab, titlePaneDef)

  const showSelectPaneLab = 'showSelectPane'
  const showSelectPaneDef = false
  const showSelectPaneVal = boolean(showSelectPaneLab, showSelectPaneDef)

  return (
    <div style={{ width: 400 }}>
      <TagSection
        title={titlePaneVal}
        tags={marvelTags}
        possibleTags={marvelPossibleTags}
        showSelectPane={showSelectPaneVal}
      />
    </div>
  )
})
