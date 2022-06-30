import React, { useMemo } from 'react'
import NotificationsForm from './NotificationsForm'
import UsersQl from '../../../services/UsersQl'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import { useQuery, useMutation } from '@apollo/react-hooks'

const GET_NOTIFICATIONS_STATUS_QUERY = UsersQl.getMe()
const SET_NOTIFICATIONS_STATUS_QUERY = UsersQl.setNotificationsStatus()

NotificationsFormContainer.propTypes = {
  /** Called when the close button is clicked */
  onClose: PropTypes.func.isRequired,

  /** Called after notifications have been paused */
  onPause: PropTypes.func.isRequired,

  /** Called after notifications have been resumed */
  onResume: PropTypes.func.isRequired,
}

export default function NotificationsFormContainer({ onClose, onPause, onResume }) {
  const { data, error } = useQuery(GET_NOTIFICATIONS_STATUS_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  const [setNotificationsStatus] = useMutation(SET_NOTIFICATIONS_STATUS_QUERY, {
    onCompleted() {
      onClose()
    },
  })

  const { startDateTime, endDateTime } = useMemo(() => {
    let { startDate: startDateTime, endDate: endDateTime, indefinite } = data.me.notificationsStatus

    startDateTime = startDateTime
      ? dayjs(startDateTime)
          .utc(true)
          .format()
      : null
    endDateTime = endDateTime
      ? dayjs(endDateTime)
          .utc(true)
          .format()
      : null

    return {
      startDateTime,
      endDateTime,
      indefinite,
    }
  }, [data.me.notificationsStatus])

  const handlePause = ({ startDateTime, endDateTime }) => {
    const utcStartDateTime = startDateTime ? dayjs(startDateTime).format() : null
    const utcEndDateTime = endDateTime ? dayjs(endDateTime).format() : null

    setNotificationsStatus({
      variables: {
        startDate: utcStartDateTime,
        endDate: utcEndDateTime,
        indefinite: (startDateTime && !endDateTime) || (!startDateTime && endDateTime),
      },
    })

    if (typeof onPause === 'function') {
      onPause({ startDateTime, endDateTime })
    }
  }

  const handleResume = () => {
    setNotificationsStatus({
      variables: {
        startDate: null,
        endDate: null,
        indefinite: false,
      },
    })

    if (typeof onResume === 'function') {
      onResume()
    }
  }

  const paused = data.me.notificationsStatus.paused

  const scheduled = useMemo(() => startDateTime && !paused, [startDateTime, paused])

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <NotificationsForm
      onClose={onClose}
      paused={paused}
      defaultPauseStartDateTime={startDateTime}
      defaultPauseEndDateTime={endDateTime}
      onPause={handlePause}
      onResume={handleResume}
      scheduled={scheduled}
    />
  )
}
