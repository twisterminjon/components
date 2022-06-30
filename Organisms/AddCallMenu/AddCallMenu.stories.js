import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import AddCallMenu from './AddCallMenu'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.add('AddCallMenu', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)

  const enableCaregiversLab = 'enableCaregivers'
  const enableCaregiversDef = true
  const enableCaregiversVal = boolean(enableCaregiversLab, enableCaregiversDef)

  const enableInterpretersLab = 'enableInterpreters'
  const enableInterpretersDef = true
  const enableInterpretersVal = boolean(enableInterpretersLab, enableInterpretersDef)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AddCallMenu
        show={showVal}
        enableCaregivers={enableCaregiversVal}
        enableInterpreters={enableInterpretersVal}
        onAddStaff={() => {
          alert('add staff')
        }}
        onAddCaregiver={() => {
          alert('add caregiver')
        }}
        onAddInterpreter={() => {
          alert('add Interpreter')
        }}
        onBack={() => {
          alert('go back')
        }}
      />
    </div>
  )
})
