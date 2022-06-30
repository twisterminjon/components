import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SearchBarPatients from './SearchBarPatients'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.add('SearchBarPatients', () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'cornsilk',
      }}>
      <SearchBarPatients
        onChange={value => action('changed')(value)}
        onAdd={() => {
          alert('clicked add')
        }}
        value="searchTerm"
      />
    </div>
  )
})
