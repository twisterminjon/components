import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import TimeSelector from './TimeSelector'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TimeSelector', () => {
  const placeholderValue = text('placeholder', 'Enter time')
  const defaultTimeValue = text('defaultValue', '2:44 pm')
  const showSecondValue = boolean('showSecond', false)
  const timeFormatValue = text('timeFormat', 'h:mm a')
  const use12HoursValue = boolean('use12Hours', true)

  return (
    <div style={{ width: 400 }}>
      <TimeSelector
        showSecond={showSecondValue}
        defaultValue={defaultTimeValue} // TODO: Re-enable defaultValue
        onChange={time => alert(`onChange: ${time}`)}
        format={timeFormatValue}
        use12Hours={use12HoursValue}
        placeholder={placeholderValue}
      />
    </div>
  )
})
