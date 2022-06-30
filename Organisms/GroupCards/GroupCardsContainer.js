import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import { Query } from 'react-apollo'
import GroupsQl from '../../../services/GroupsQl'
import { getPollInterval } from '../../../config'

import GroupCards from './GroupCards'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import GroupsEmpty from './GroupsEmpty'

export default class GroupCardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupId: '',
      redirectToGroup: false,
    }

    this.handleGroupClick = this.handleGroupClick.bind(this)
  }

  handleGroupClick(id) {
    this.setState({ groupId: id, redirectToGroup: true })
  }

  render() {
    const { groupId, redirectToGroup } = this.state

    if (redirectToGroup) return <Redirect to={`/app/groups/${groupId}`} push />

    return (
      <Query
        query={GroupsQl.getGroups()}
        // FIXME: The fetch policy commented out below was put in place to resolve
        // network outages as part of ticket ST-2196. When we have a network outage
        // while on a call, and then the next poll happens, we get an error and the call ends.
        // Adding cache-and-network resolved that, no error and you stay in the call.
        //
        // However, this created a situation documented in ST-2410 that causes other
        // queries to stop polling (see favbar and groups) in Production only. After discussing with Carolyn
        // we decided the polling was more important that the outages at this date.
        //
        // We will come back at a later date and resolve when time permits.
        // fetchPolicy="cache-and-network"
        pollInterval={getPollInterval('groupCards')}>
        {({ loading, error, data, networkStatus }) => {
          if (loading && networkStatus !== 6) {
            return <Loader active />
          }

          if (error) {
            // unhandled error
            if (!error.message.includes('Network error: Failed to fetch')) {
              return <ErrorPage error={error} />
            }

            // fetch error (api server down) AND no data
            if (!data && error.message.includes('Network error: Failed to fetch')) {
              return <ServerIssue />
            }
          }

          let groups = []
          groups = data.me.canCallGroups.filter(g => g.isActive)

          if (groups.length === 0) {
            return <GroupsEmpty />
          }

          return <GroupCards groups={groups} onGroupClick={this.handleGroupClick} />
        }}
      </Query>
    )
  }
}
