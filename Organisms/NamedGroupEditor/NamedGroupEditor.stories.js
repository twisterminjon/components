import React from 'react'

import { storiesOf } from '@storybook/react'
import CenterView from '../../../storybookUtils/CenterView'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import NamedGroupEditor from './NamedGroupEditor'

import userLookup from '../../../Mocks/Users.mock'

const stories = storiesOf('Provider/v1/Organisms', module)
stories
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add('NamedGroupEditor', () => {
    const loadingVal = boolean('loading', false)
    const usersLoadingVal = boolean('usersLoading', false)
    const editingVal = boolean('editing', false)

    return (
      <NamedGroupEditor
        loading={loadingVal}
        usersLoading={usersLoadingVal}
        userLookup={userLookup}
        members={[userLookup[0]]}
        editing={editingVal}
        onSave={action('onSave')}
        onClose={action('onClose')}
      />
    )
  })
