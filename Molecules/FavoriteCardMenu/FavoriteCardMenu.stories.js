import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import FavoriteCardMenu from './FavoriteCardMenu'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('FavoriteCardMenu', () => {
  const disableCallLab = 'disableCall'
  const disableCallDef = false
  const disableCallVal = boolean(disableCallLab, disableCallDef)

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FavoriteCardMenu
        // Note: style is just so it shows in the story (it is width: 0 by default and width is controlled by css in another component)
        style={{ width: 116 }}
        disableCall={disableCallVal}
        onCall={() => {
          alert('Call clicked')
        }}
        onMessage={() => {
          alert('Message clicked')
        }}
      />
    </div>
  )
})
