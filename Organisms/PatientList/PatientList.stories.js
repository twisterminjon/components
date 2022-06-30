import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import PatientList from './PatientList'

import { enterprises } from '../../../Mocks/Enterprise.mock'
import patientListMock from '../../../Mocks/PatientList.mock'

storiesOf('Provider/v1/Organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('PatientList', () => {
    const handleStatusDifference = () => {
      return patientListMock
    }
    const rest = {
      match: {
        params: {
          enterpriseId: 1,
        },
      },
    }

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'black',
        }}>
        <PatientList
          enterprises={enterprises}
          patients={patientListMock}
          onEnterpriseChange={id => alert(`Enterprise changed ${id}`)}
          onPatientChange={id => alert(`Patient clicked ${id}`)}
          selectedPatientId="1"
          onClick={id => {
            alert(`Clicked ${id}`)
          }}
          onPatientStatusUpdate={() => patientListMock}
          handleStatusDifference={handleStatusDifference}
          // for story only
          location={{ pathname: '/app/patients/123' }}
          patientsLoading={boolean('patientsLoading', false)}
          patientsPageNumber={0}
          patientsOnPageNumberChange={pageNumber => alert(`Patients page number changed ${pageNumber}`)}
          enterprisesLoading={boolean('enterprisesLoading', false)}
          enterprisesPageNumber={0}
          enterprisesOnPageNumberChange={pageNumber => alert(`Enterprises page number changed ${pageNumber}`)}
          {...rest}
        />
      </div>
    )
  })
