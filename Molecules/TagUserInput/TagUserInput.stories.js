import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import CenterView from '../../../storybookUtils/CenterView'
import { action } from '@storybook/addon-actions'

import users from '../../../Mocks/Users.mock'

import TagUserInput from './TagUserInput'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView inverted>{getStory()}</CenterView>)
  .add('TagUserInput', () => {
    return <TagUserInput value="Dave" users={users} onRemove={action('onRemove')} onSearch={action('onSearch')} />
  })
