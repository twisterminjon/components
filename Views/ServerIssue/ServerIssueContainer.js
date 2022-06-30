import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import ServerIssue from './ServerIssue'
import gql from 'graphql-tag'
import { BUS_EVENTS, EventBus } from '@shared/helpers'
import { useQuery } from 'react-apollo'

export default function ServerIssueContainer({ ...rest }) {
  const query = gql`
    query me {
      me {
        id
      }
    }
  `
  const { data } = useQuery(query, { fetchPolicy: 'network-only', pollInterval: 2000 })

  const history = useHistory()

  useEffect(() => {
    if (data) {
      EventBus.emit(BUS_EVENTS.SERVER_ONLINE)

      // Bail out if event bus doesn't bail out
      const t = setTimeout(() => {
        history.go(-1)
      }, 5000)

      return () => clearTimeout(t)
    }
  }, [data, history])

  return <ServerIssue {...rest} />
}
