import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import CaregiverSearch from './CaregiverSearch'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.add('CaregiverSearch', () => {
  const loadingLab = 'loading'
  const loadingDef = true
  const loadingVal = boolean(loadingLab, loadingDef)

  return (
    <div
      style={{
        backgroundImage: 'url("https://picsum.photos/500/500/?random")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <CaregiverSearch
        loading={loadingVal}
        onCancel={e => {
          alert(`You don't love me anymore :(`)
        }}
        onAdd={() => {
          alert('Adding stuff')
        }}
        onSearch={val => {
          alert(`search for ${val}`)
        }}
      />
    </div>
  )
})
