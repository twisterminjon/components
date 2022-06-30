import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import SelectSideBar from './SelectSideBar'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('SelectSideBar', () => {
  const titleLabel = 'title'
  const titleDefaultValue = 'Select Role'
  const titleValue = text(titleLabel, titleDefaultValue)

  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const list = [
    { id: '0', name: 'X-wing' },
    { id: '1', name: 'Tie Fighter' },
    { id: '2', name: 'Y-wing' },
    { id: '3', name: 'At-at' },
    {
      id: '4',
      name: 'Admiral Ackbar says "Its a trap", and you should listen to him',
    },
  ]

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
      <SelectSideBar
        show={showValue}
        title={titleValue}
        list={list}
        onSelect={e => {
          alert(`You picked id: ${e}`)
        }}
        onCancel={e => {
          alert(`You don't love me anymore :(`)
        }}
      />
    </div>
  )
})
