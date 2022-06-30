import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import PatientPrograms from './PatientPrograms'

import data from '../../../Mocks/PatientDetails.mock'
import { enterpriseLookups } from '../../../Mocks/EnterpriseLookups.mock'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('PatientPrograms', () => {
  const enrollments = data.user.patient.enrollments
  const programs = enterpriseLookups.enterprise.programs

  const loadingLab = 'loading'
  const loadingDef = false
  const loadingVal = boolean(loadingLab, loadingDef)

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
      <PatientPrograms
        enrollments={enrollments}
        programsLookup={programs}
        onAddProgram={id => {
          alert(`add ${id}`)
        }}
        loading={loadingVal}
      />
    </div>
  )
})
