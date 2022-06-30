import React from 'react'
import { Switch } from 'react-router-dom'

import { InfoPage, OneClickContainer, OneClickMessagesContainer, Route } from '@shared/components'

export default function OneClickManager() {
  return (
    <Switch>
      <Route exact path="/one-click/:type/:id/:token" render={() => <OneClickContainer />} />

      <Route path="/one-click/message" render={() => <OneClickMessagesContainer />} />

      <Route
        exact
        path="/one-click/expired"
        render={() => {
          return (
            <InfoPage
              title="Sorry..."
              message={`Sorry, the link has expired. You will need to log into the ${window.projectConfig.appTitle} app to continue. If you need assistance, please contact your provider.`}
            />
          )
        }}
      />
    </Switch>
  )
}
