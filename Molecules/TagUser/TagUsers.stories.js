import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CenterView from '../../../storybookUtils/CenterView'
import { withKnobs } from '@storybook/addon-knobs'

import users from '../../../Mocks/Users.mock'

import TagUsers from './TagUsers'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('TagUsers', () => {
    return <TagUsers onRemove={action('onRemove')} users={users} />
  })
