import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CenterView from '../../../storybookUtils/CenterView'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import CaregiverAccessCode from './CaregiverAccessCode'

storiesOf('Provider/v1/Organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView inverted>{getStory()}</CenterView>)

  .add('CaregiverAccessCode', () => {
    let codeVal = text('code', '12345')
    const isExpiredVal = boolean('isExpired', true)
    const loadingVal = boolean('loading', false)

    let nullVal = boolean('Null Code', false)

    codeVal = nullVal ? null : codeVal

    return (
      <CaregiverAccessCode
        accessCode={{ code: codeVal, isExpired: isExpiredVal }}
        loading={loadingVal}
        onGetNewCode={action('onGetNewCode')}
      />
    )
  })
