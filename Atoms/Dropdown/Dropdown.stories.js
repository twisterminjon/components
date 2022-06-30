import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import Dropdowm from './Dropdown'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Dropdown', () => {
  const titleVal = text('title', 'Enterprise - Parent Organization')
  const loadingVal = boolean('loading', false)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'var(--patientpage__card_selected_bg)',
        color: 'var(--patientpage__card_selected_fg)',
        height: 'var(--patient-header-height)',
        width: 250,
        paddingLeft: '26px',
      }}>
      <Dropdowm
        onClick={() => {
          alert('clicked')
        }}
        title={titleVal}
        showSelect={() => alert('Open select pane')}
        loading={loadingVal}
      />
    </div>
  )
})
