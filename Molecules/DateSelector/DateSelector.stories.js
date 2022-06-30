import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import DateSelector from './DateSelector'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'DateSelector',
  withInfo()(() => {
    const placeholderValue = text('placeholder', 'Enter date')
    const defaultDateValue = text('defaultValue', '10/20/2020')
    const formatValue = text('format', 'MM/DD/YYYY')
    const numberOfMonthsValue = number('numberOfMonths', 1)

    return (
      <div style={{ width: 400 }}>
        <DateSelector
          anchorDirection="right"
          appendToBody={true}
          defaultValue={defaultDateValue}
          format={formatValue}
          numberOfMonths={numberOfMonthsValue}
          onChange={date => alert(`onChange: ${date}`)}
          placeholder={placeholderValue}
        />
      </div>
    )
  })
)
