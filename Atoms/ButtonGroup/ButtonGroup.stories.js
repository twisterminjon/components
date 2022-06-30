import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ButtonGroup from './ButtonGroup'

const stories = storiesOf('Provider/v1/Atoms', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('ButtonGroup', () => {
    const buttonOneLabelVal = text('buttonOneLabel', 'The One')
    const buttonTwoLabelVal = text('buttonTwoLabel', 'The Two')
    const loadingVal = boolean('loading', false)

    const activeOpts = {
      1: '1',
      2: '2',
      none: 'none',
    }
    const activeVal = select('active', activeOpts, '1')

    return (
      <div style={{ width: 400 }}>
        <ButtonGroup
          buttonOneLabel={buttonOneLabelVal}
          buttonTwoLabel={buttonTwoLabelVal}
          buttonOneOnClick={action('buttonOneOnClick')}
          buttonTwoOnClick={action('buttonTwoOnClick')}
          active={activeVal}
          loading={loadingVal}
        />
      </div>
    )
  })
