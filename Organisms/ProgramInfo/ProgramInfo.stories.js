import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import ProgramInfo from './ProgramInfo'
import patient from '../../../Mocks/PatientDetails.mock'

storiesOf('Provider/v1/Organisms', module)
  .addDecorator(withKnobs)
  .add('ProgramInfo', () => {
    const program = {
      id: 1,
      date: '2019-02-29',
      label: 'Radiology Program',
    }

    const disenrolling = boolean('disenrolling', false)

    return (
      <div style={{ width: '100%' }}>
        <ProgramInfo
          onDisenroll={action('clicked disenroll')}
          disenrolling={disenrolling}
          program={program}
          user={patient.user}
        />
      </div>
    )
  })
