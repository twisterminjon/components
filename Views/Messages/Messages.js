import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import { Route } from '@shared/components'

import ThreadListContainer from '../../Organisms/ThreadList/ThreadListContainer'
import ThreadContainer from '../../Organisms/Thread/ThreadContainer'
import ThreadAddUserContainer from '../../Organisms/Thread/ThreadAddUserContainer'
import ThreadAddGroupContainer from '../../Organisms/Thread/ThreadAddGroupContainer'
import CreateNamedGroupContainer from '../../Organisms/NamedGroupEditor/CreateNamedGroupContainer'
import EditNamedGroupContainer from '../../Organisms/NamedGroupEditor/EditNamedGroupContainer'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './Messages.css'

Messages.propTypes = {
  /** Called to initiate a call with a user */
  onStartCall: PropTypes.func.isRequired,
}

export default function Messages({ onStartCall, ...rest }) {
  const { history } = rest

  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showEditGroup, setShowEditGroup] = useState(false)

  // Fix issue where group overlay would try to show after hitting back button.
  //
  // Also work around issue that React Router doesn't expose its stack,
  // directly.
  const [localHistoryStack, setLocalHistoryStack] = useState([])
  useEffect(() => {
    return history.listen(path => {
      // Push path to history stack
      setLocalHistoryStack(prevStack => [...prevStack, path])
    })
  }, [history])
  useEffect(() => {
    if (showCreateGroup || showEditGroup) {
      return history.listen(() => {
        setShowCreateGroup(false)
        setShowEditGroup(false)

        // Redirect to thread
        history.push(localHistoryStack[localHistoryStack.length - 1])
      })
    }
  }, [history, showCreateGroup, showEditGroup, localHistoryStack])

  const handleShowGroupEditor = useCallback((options = {}) => {
    const { editing = false } = options
    editing ? setShowEditGroup(true) : setShowCreateGroup(true)
  }, [])

  const handleHideGroupEditor = useCallback(() => {
    setShowCreateGroup(false)
    setShowEditGroup(false)
  }, [])

  if (showCreateGroup) return <CreateNamedGroupContainer onClose={handleHideGroupEditor} {...rest} />

  if (showEditGroup) return <EditNamedGroupContainer onClose={handleHideGroupEditor} {...rest} />

  return (
    <div className="messages-wrap" data-testid="page-messages">
      <DocTitle title="Messages" />
      <Switch>
        <Route
          exact
          path="/app/messages"
          render={props => {
            return <ThreadListContainer onShowGroupEditor={handleShowGroupEditor} {...props} />
          }}
        />

        <Route
          exact
          path={['/app/messages/:threadId', '/app/messages/user/:userId']}
          render={props => {
            return (
              <React.Fragment>
                <ThreadListContainer onShowGroupEditor={handleShowGroupEditor} {...props} />
                <div className="messages-thread-wrap" data-testid="message-thread">
                  <ThreadContainer onStartCall={onStartCall} onShowGroupEditor={handleShowGroupEditor} {...props} />
                </div>
              </React.Fragment>
            )
          }}
        />

        {/* -------------------------------------------------------------------------
            Add user to message
            -------------------------------------------------------------------------*/}
        <Route
          exact
          path="/app/messages/:threadId/add"
          render={props => {
            return <ThreadAddUserContainer {...props} />
          }}
        />

        {/* -------------------------------------------------------------------------
             Add user by group
            -------------------------------------------------------------------------*/}
        <Route
          exact
          path="/app/messages/:threadId/add-group"
          render={props => {
            return <ThreadAddGroupContainer {...props} />
          }}
        />
      </Switch>
    </div>
  )
}
