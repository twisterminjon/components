import React, { useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import UsersQl from '../../../services/UsersQl'
import { ProjectDate } from '@shared/helpers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import Announcement from './Announcement'

const GET_ANNOUNCEMENT_QUERY = UsersQl.getAnnouncement()
const MARK_READ_MUTATION = UsersQl.markAnnouncementRead()
const REMOVE_ANNOUNCEMENT_MUTATION = UsersQl.removeAnnouncement()

export default function AnnouncementContainer({ ...props }) {
  const id = props.match.params.id

  const { data, loading, error } = useQuery(GET_ANNOUNCEMENT_QUERY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  const [markRead, { error: markReadError }] = useMutation(MARK_READ_MUTATION, {
    variables: { id },
  })

  const [removeAnnouncement, { loading: removeLoading, error: removeError }] = useMutation(
    REMOVE_ANNOUNCEMENT_MUTATION,
    {
      variables: { id },
      onCompleted: () => {
        props.history.replace('/app/announcements')
      },
    }
  )

  useEffect(() => {
    if (data) {
      const status = data.announcement.userAnnouncement.status

      if (status === 'SENT') {
        markRead()
      }
      if (status === 'REMOVED') {
        props.history.replace('/app/announcements')
      }
    }
  }, [data, markRead, props.history])

  if (error || markReadError || removeError) {
    return <ErrorPage error={error || markReadError || removeError} />
  }

  // We need to adjust the data to add text based time for display
  if (data) {
    data.announcement.time = ProjectDate(data.announcement.sentAt).formatFriendly()
  }

  const handleRemove = id => {
    removeAnnouncement()
  }

  const handleOnClose = id => {
    props.history.push('/app/announcements')
  }

  return (
    <Announcement
      loading={loading}
      removeLoading={removeLoading}
      announcement={data ? data.announcement : {}}
      onRemove={handleRemove}
      onClose={handleOnClose}
    />
  )
}
