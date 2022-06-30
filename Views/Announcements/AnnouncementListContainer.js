import React, { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { useSyncQuery, EVT_USER_ANNOUNCEMENT_UPDATED } from '@shared/hooks'
import UsersQl from '../../../services/UsersQl'
import { ProjectDate } from '@shared/helpers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import AnnouncementList from './AnnouncementList'

const GET_ANNOUNCEMENTS_QUERY = UsersQl.getAnnouncements()
const REMOVE_ANNOUNCEMENT_MUTATION = UsersQl.removeAnnouncement()

export default function AnnouncementListContainer({ ...props }) {
  const [loadingId, setLoadingId] = useState()

  // Query for updated announcements
  const { data, loading, error } = useSyncQuery(GET_ANNOUNCEMENTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    // syncName: 'AnnouncementsContainer',
    syncEventNames: [EVT_USER_ANNOUNCEMENT_UPDATED],
  })

  const [removeAnnouncement, { error: removeAnnouncementError }] = useMutation(REMOVE_ANNOUNCEMENT_MUTATION, {
    onCompleted: () => {
      setLoadingId(null)
    },
    refetchQueries: [{ query: GET_ANNOUNCEMENTS_QUERY }],
  })

  if (error || removeAnnouncementError) {
    return <ErrorPage error={error} />
  }

  // We need to adjust the data to add text based time for display
  if (data) {
    data.me.announcements.forEach(a => (a.time = ProjectDate(a.sentAt).formatFriendly()))
  }

  const handleOnView = id => {
    props.history.push(`/app/announcements/${id}`)
  }

  const handleOnRemove = id => {
    setLoadingId(id)

    const variables = { id }
    removeAnnouncement({ variables })
  }

  const handleOnClose = () => {
    props.history.push(`/app/dashboard`)
  }

  return (
    <AnnouncementList
      loading={loading}
      loadingId={loadingId}
      list={data ? data.me.announcements : []}
      onView={handleOnView}
      onClose={handleOnClose}
      onRemove={handleOnRemove}
    />
  )
}
