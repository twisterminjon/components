import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import PatientData from './PatientData'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientData', () => {
  const titleLabel = 'title'
  const titleDefault = 'Mobile'
  const titleValue = text(titleLabel, titleDefault)

  const dataLabel = 'data'
  const dataDefault = '752-524-8545'
  const dataValue = text(dataLabel, dataDefault)

  return (
    <div
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PatientData title={titleValue} data={dataValue} />
    </div>
  )
})
