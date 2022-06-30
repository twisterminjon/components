import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { toast } from 'react-toastify'
import { throttle } from 'lodash-es'

import { AuthUtils } from '@shared/helpers'
import UsersQl from '../../../services/UsersQl'

import StorageUtils from '../../../Helpers/StorageUtils'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import './CheckPasswordExpiration.css'

import debug from 'debug'
const d = debug('project:CheckPasswordExpiration')

// Determine when the password will expire and notify the user if needed
export default class CheckPasswordExpiration extends Component {
  constructor(props) {
    super(props)

    // just throttling the debug log
    this.handleLog = throttle(this.handleLog.bind(this), 60000, {
      leading: true,
    })
  }

  passwordWarningToastId = 'password-warning-id'
  passwordErrorToastId = 'password-error-id'

  checkPasswordExpiration = data => {
    const pd = data.user

    const daysToExpire = pd.credentials.daysToExpire
    const warningDays = pd.enterprise.staffPasswordWarning

    d(`days until expiration '${daysToExpire}'`)
    d(`base warning days '${warningDays}'`)

    if (daysToExpire > warningDays) {
      d(`no warning required`)

      // If not in the warning window, just bail, nothing to do
      return
    }

    if (daysToExpire > 0) {
      // We haven't expired but passed the warning threshold
      d(`showing warning message`)
      toast.warn(<WarningMessage days={daysToExpire} />, {
        toastId: this.passwordWarningToastId,
        autoClose: false,
      })
      return
    }

    // We are expired
    d(`showing expired message`)
    toast.error(<ExpiredMessage days={daysToExpire} />, {
      toastId: this.passwordErrorToastId,
      autoClose: false,
    })
  }

  handleLog = log => {
    d(log)
  }

  render() {
    const daysSince = StorageUtils.getDaysSinceLastWarning()
    this.handleLog(`number of days since last warning: ${daysSince}`)

    if (daysSince > 0) {
      d(`getting latest password reqs`)

      const PASSWORD_REQ_QUERY = UsersQl.getPasswordRequirements()

      return (
        <Query
          query={PASSWORD_REQ_QUERY}
          variables={{ id: AuthUtils.getUserId() }}
          onCompleted={data => {
            this.checkPasswordExpiration(data)
            StorageUtils.setLastPasswordWarning()
          }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return <ErrorPage error={error} />

            return null
          }}
        </Query>
      )
    }

    return null
  }
}

const WarningMessage = ({ days }) => {
  const messageDays = days === 0 ? 'today' : `in ${days} days`

  return (
    <React.Fragment>
      <p className="checkpasswordexpiration-message">Your password will expire in {messageDays} days.</p>
      <Link to="/update-password" className="checkpasswordexpiration-button">
        Update password
      </Link>
    </React.Fragment>
  )
}

const ExpiredMessage = () => {
  return (
    <React.Fragment>
      <p className="checkpasswordexpiration-message">Your password has expired.</p>
      <Link to="/update-password" className="checkpasswordexpiration-button">
        Update password
      </Link>
    </React.Fragment>
  )
}
