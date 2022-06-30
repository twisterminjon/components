import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AppHeader from './AppHeader'

import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.add('AppHeader', () => {
  const picValue = boolean('show pic', true)
  const picSource = picValue ? 'https://www.fillmurray.com/600/200' : ''

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <CurrentUserContext.Provider value={currentUser}>
        <AppHeader
          onHome={action('onHome')}
          onStaff={action('onStaff')}
          onPatients={action('onPatients')}
          onMessage={action('onMessage')}
          onCalls={action('onCalls')}
          onMenu={action('onMenu')}
          enterpriseLogo={picSource}
          // for RR mock
          location={{ pathname: '/app/staffV1' }}
        />
      </CurrentUserContext.Provider>
    </div>
  )
})
