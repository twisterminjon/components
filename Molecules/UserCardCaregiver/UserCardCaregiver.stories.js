import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import UserCardCaregiver from './UserCardCaregiver'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Molecules', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('UserCardCaregiver', () => {
    const displayNameLab = 'displayName'
    const displayNameDef = 'Dr. Strange'
    const displayNameVal = text(displayNameLab, displayNameDef)

    const phoneNumberLab = 'phoneNumber'
    const phoneNumberDef = '5554443333'
    const phoneNumberVal = text(phoneNumberLab, phoneNumberDef)

    const canCallLab = 'canCall'
    const canCallDef = true
    const canCallVal = boolean(canCallLab, canCallDef)

    const canMessageLab = 'canMessage'
    const canMessageDef = true
    const canMessageVal = boolean(canMessageLab, canMessageDef)

    const canOdmLab = 'canOdm'
    const canOdmDef = true
    const canOdmVal = boolean(canOdmLab, canOdmDef)

    const showMenuButtonLab = 'showMenuButton'
    const showMenuButtonDef = true
    const showMenuButtonVal = boolean(showMenuButtonLab, showMenuButtonDef)

    const statusLab = 'Status'
    const statusOptions = {
      none: 'none',
      available: USER_STATUS_AVAILABLE,
      busy: USER_STATUS_BUSY,
      away: USER_STATUS_AWAY,
      offline: USER_STATUS_OFFLINE,
    }
    const statusDef = USER_STATUS_AVAILABLE
    let statusVal = select(statusLab, statusOptions, statusDef)
    statusVal = statusVal === 'none' ? '' : statusVal

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
        <UserCardCaregiver
          canCall={canCallVal}
          canMessage={canMessageVal}
          canOdm={canOdmVal}
          showMenuButton={showMenuButtonVal}
          displayName={displayNameVal}
          phoneNumber={phoneNumberVal}
          profileImage="https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg"
          status={statusVal}
          loading={loadingVal}
          onOdm={() => {
            alert('odm clicked')
          }}
          onMessage={() => {
            alert('message clicked')
          }}
          onCall={() => {
            alert('call clicked')
          }}
          onRemove={() => {
            alert('remove clicked')
          }}
          onClick={() => {
            alert('card clicked')
          }}
        />
      </div>
    )
  })
