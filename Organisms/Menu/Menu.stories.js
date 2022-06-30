import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'

import Menu from './Menu'

const stories = storiesOf('Provider/v1/Organisms', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('Menu', () => {
    const visibleVal = boolean('visible', true)

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <Menu
          visible={visibleVal}
          onHide={action('onHide')}
          onMenuItem={({ id, label }) => alert(`onMenuItemSelect({id: "${id}", label: "${label}"})`)}>
          App
        </Menu>
      </CurrentUserContext.Provider>
    )
  })
