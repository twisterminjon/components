import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { CurrentUserContext } from '@shared/providers'
import { AuthUtils, featureSecureMessages, featureVirtualCalls } from '@shared/helpers'
import { getPollInterval } from '../../../config'

import UsersQl from '../../../services/UsersQl'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import FavBar from './FavBar'

import debug from 'debug'
const d = debug('project:FavBarContainer')

export default class FavBarContainer extends Component {
  static propTypes = {
    onFavoriteClick: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      navigateToCall: false,
    }

    this.handleMessageClick = this.handleMessageClick.bind(this)
  }

  componentDidMount() {
    d(`mounted`)
  }

  handleMessageClick(user) {
    d(`handleMessageClick with ${user.id}`)

    this.props.history.push(`/app/messages/user/${user.id}`)
  }

  render() {
    const { onFavoriteClick } = this.props

    const userId = AuthUtils.getUserId()
    const QUERY = UsersQl.getUserFavorites()

    return (
      <Query
        query={QUERY}
        fetchPolicy="cache-and-network"
        variables={{ id: userId }}
        pollInterval={getPollInterval('favBar')}>
        {({ loading, error, data, networkStatus }) => {
          // unhandled error
          if (error) {
            if (!error.message.includes('Network error: Failed to fetch')) {
              return <ErrorPage error={error} />
            }
          }

          // fetch error (api server down) AND no data
          if (!data && error && error.message.includes('Network error: Failed to fetch')) {
            return <ServerIssue />
          }

          let favs = []
          if (data && data.user) {
            favs = data.user.favorites.filter(u => u.isActive)
          }

          return (
            <CurrentUserContext.Consumer>
              {user => (
                <FavBar
                  users={favs}
                  onCall={onFavoriteClick}
                  onMessage={this.handleMessageClick}
                  loading={networkStatus !== 6 && loading}
                  messagesEnabled={featureSecureMessages(user)}
                  virtualCallsEnabled={featureVirtualCalls(user) && user.micCamAvailable}
                />
              )}
            </CurrentUserContext.Consumer>
          )
        }}
      </Query>
    )
  }
}
