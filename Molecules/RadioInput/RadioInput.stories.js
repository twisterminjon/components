import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import RadioInput from './RadioInput'
import IconEnvelope from '../../Atoms/Icons/IconEnvelope'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('RadioInput', () => {
  const checkedVal = boolean('checked', true)

  return (
    <div style={{ padding: 10, color: 'white' }}>
      Inline
      <br />
      <RadioInput label="radio1" name="radio1" value="radio1" checked={checkedVal} onChange={action('onChange')} />
      <RadioInput label="radio2" name="radio2" value="radio2" checked={checkedVal} onChange={action('onChange')} />
      <br />
      <br />
      <br />
      full width
      <br />
      <RadioInput
        label="radio3"
        name="radio3"
        value="radio3"
        fluid={true}
        checked={checkedVal}
        onChange={action('onChange')}
      />
      <br />
      <RadioInput
        label="radio4"
        name="radio4"
        value="radio4"
        fluid={true}
        checked={checkedVal}
        onChange={action('onChange')}
      />
      <br />
      <RadioInput
        label={<IconEnvelope color="white" />}
        name="radio5"
        value="radio5"
        fluid={true}
        checked={checkedVal}
        onChange={action('onChange')}
      />
    </div>
  )
})
