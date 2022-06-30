import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ProgramDetails from './ProgramDetails'
import patient from '../../../Mocks/PatientDetails.mock'
import { events } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Views', module).add('ProgramDetails', () => {
  const program = {
    id: 1,
    date: '2019-02-29',
    label: 'Radiology Program',
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ProgramDetails
        events={events}
        onComplete={action('clicked complete')}
        onDisenroll={action('clicked disenroll')}
        onSave={action('clicked save')}
        program={program}
        user={patient.user}
      />
    </div>
  )
})
