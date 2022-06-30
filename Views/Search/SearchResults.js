import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import UserList from '../../Organisms/UserList/UserList'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './SearchResults.css'

import debug from 'debug'
const d = debug('project:SearchResults')

export default class SearchResults extends Component {
  static propTypes = {
    /** Array of users to display */
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        overallStatus: PropTypes.string.isRequired,
        favorite: PropTypes.bool.isRequired,
      })
    ),

    /** Function called when the call button is clicked */
    onStartCall: PropTypes.func.isRequired,

    /** If true, will show the message button */
    canMessage: PropTypes.bool.isRequired,

    /** If true, will show the dial button */
    canCall: PropTypes.bool.isRequired,

    /** Whether or not the user list is loading */
    loading: PropTypes.bool.isRequired,

    /** The current page number, starting from 0 */
    pageNumber: PropTypes.number.isRequired,

    /** Called, with the current page number, after the page number changes */
    onPageNumberChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      navigateToDashboard: false,
    }

    this.handleStartCall = this.handleStartCall.bind(this)

    d(`constructor complete`)
  }

  handleStartCall(user) {
    d(`calling user ${user.id}, ${user.displayName}`)

    this.props.onStartCall(user)
  }

  render() {
    const { style, users, canMessage, canCall, loading, pageNumber, onPageNumberChange, ...rest } = this.props
    const { navigateToDashboard } = this.state

    if (navigateToDashboard) {
      return <Redirect to="/app/dashboard" push />
    }

    const bgColor = { backgroundColor: 'rgb(0, 20, 51)' }
    const styleOverride = { ...bgColor, ...style }

    const countString = users.length ? (
      <p>
        <span className="searchresults-counter--bold">{users.length}</span> Search Result{users.length !== 1 ? 's' : ''}
      </p>
    ) : (
      'No users were found'
    )

    return (
      <div className="searchresults" style={styleOverride}>
        <DocTitle title="Search" />

        <div className="searchresults-counter">{countString}</div>
        <UserList
          canMessage={canMessage}
          canCall={canCall}
          userList={users}
          onCall={this.handleStartCall}
          loading={loading}
          pageNumber={pageNumber}
          onPageNumberChange={onPageNumberChange}
          {...rest}
        />

        {loading && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              textAlign: 'center',
            }}>
            <SpinnerDots style={{ display: 'inline-block' }} />
          </div>
        )}
      </div>
    )
  }
}
