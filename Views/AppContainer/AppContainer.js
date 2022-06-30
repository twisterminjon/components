import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { Switch, Redirect } from 'react-router-dom'

import dayjs from 'dayjs'

import {
  useSyncQuery,
  useObjectState,
  useUserStatusSync,
  useSyncEvent,
  useUnreadMessagesCountUpdater,
  useNetworkConnectionState,
  usePubNubCredentials,
  useCurrentUser,
  useIsOneClick,
  EVT_SURVEY_ASSIGNED,
  EVT_SURVEY_UNASSIGNED,
  EVT_SURVEY_COMPLETED,
  EVT_USER_STATUS_UPDATED,
  EVT_USER_ANNOUNCEMENT_UPDATED,
  EVT_PERMISSION_CHANGED,
  EVT_ENTERPRISE_FEATURES_CHANGED,
  EVT_USER_MISSED_CALLS_UPDATED,
  EVT_USER_NOTIFICATIONS_UPDATED,
} from '@shared/hooks'
import UsersQl from '../../../services/UsersQl'
import { CurrentUserContext, EnvironmentContext, SidebarProvider } from '@shared/providers'

import AppHeaderContainer from '../../Organisms/AppHeader/AppHeaderContainer'
import AnnouncementContainerV1 from '../../Views/Announcements/AnnouncementContainer'
import AnnouncementListContainer from '../../Views/Announcements/AnnouncementListContainer'
import AssessmentsContainerV1 from '../Assessment/AssessmentsContainer'
import AssessmentContainerV1 from '../Assessment/AssessmentContainer'
import AudioCallManager from '../../Organisms/AudioCallManager/AudioCallManager'
import AwayStatus from '../../../utils/AwayStatus'
import CallHistoryContainer from '../../Organisms/CallList/CallHistoryContainer'
import CaregiverFormContainerV1 from '../../Views/Caregivers/CaregiverFormContainer'
import CaregiverSearchContainer from '../../Views/CaregiverSearch/CaregiverSearchContainer'
import CheckPasswordExpiration from '../../Atoms/CheckPasswordExpiration/CheckPasswordExpiration'
import ChooseCallType from '../../Molecules/ChooseCallType/ChooseCallType'
import Dashboard from '../Dashboard/Dashboard'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import Favicon from '../../Atoms/Favicon/Favicon'
import Firebase from '../../../utils/FirebaseAnalytics'
import GroupsContainerV1 from '../Groups/GroupsContainer'
import MenuContainer from '../../Organisms/Menu/MenuContainer'
import Messages from '../Messages/Messages'
import NetworkStatus from '../../../utils/NetworkStatus'
import NotFound from '../NotFound/NotFound'
import { showAnnouncementNotification } from './AppNotifications'
import PatientsV1 from '../Patients/Patients'
import Presence from '../../../utils/Presence'
import StaffContainerV1 from '../Staff/StaffContainer'
import TNContainerV1 from '../../Organisms/TNNotice/TNContainer'
import TNDeclineContainerV1 from '../../Organisms/TNNotice/TNDecline/TNDeclineContainer'
import TNDisplayContainerV1 from '../../Organisms/TNNotice/TNDisplay/TNDisplayContainer'
import TNNoticeContainerV1 from '../../Organisms/TNNotice/TNNotice/TNNoticeContainer'
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage'
import VideoContainerV1 from '../Video/VideoContainer'

import { ThreadsController, Route, MainLoader, ServerIssue, CallNotice } from '@shared/components'

// uiV2 imports
import {
  AnnouncementContainer,
  AnnouncementsContainer,
  AssessmentContainer,
  AssessmentsContainer,
  CallsContainer,
  Chat,
  CoreoLockedContainer,
  EventDayContainer,
  EventYearContainer,
  GroupContainer,
  HomeContainer,
  InterventionContainer,
  InterventionsContainer,
  Misc,
  NotificationsContainer,
  PatientContainer,
  PatientsContainer,
  PatientSearchContainer,
  SidebarContainer,
  StaffContainer,
  StaffProfileContainer,
  ThreadNewContainer,
  ThreadOptionsContainer,
  TNContainer,
  TNNoticeContainer,
  TNDisplayContainer,
  TNDeclineContainer,
  VideoContainer,
  V2PatientContainer,
} from '../../../comps'

import {
  canCallStaff,
  canCallPatients,
  featureSecureMessages,
  featureVirtualCalls,
  AuthUtils,
  Socket,
  SSO_CUSTOMERS,
} from '@shared/helpers'

import useCaptureFcmTokenModule from './AppContainer.useCaptureFcmTokenModule'
import { CallingFeatureProvider, CallingFeatureConsumer } from './AppContainer.callingFeature'

import './AppContainer.css'

import debug from 'debug'

import { useTwilioConnector } from '@shared/hooks'
const { LocalUIParticipant } = useTwilioConnector

const CURRENT_USER_QUERY = UsersQl.getMe()

const URL_LOCATIONS = {
  COREO_LOCKED: '/care/app/locked-coreo-uee',
}
// Provides 'me' context to AppContainer
export default function AppContainer({ ...rest }) {
  useEffect(() => {
    Socket.connect()
    return () => Socket.close()
  }, [])

  usePubNubCredentials()

  // Query the server to get the socket server host name for the environment context
  const { setSocketHostname } = useContext(EnvironmentContext)
  useEffect(() => {
    Socket.emit('SERVER-INFO', '', data => {
      setSocketHostname(data)
    })
  }, [setSocketHostname])

  // FIXME: Consider moving the currentUser query into the Provider.
  const { refetch: refetchMe, ...userQueryContext } = useSyncQuery(CURRENT_USER_QUERY, {
    syncEventNames: [
      EVT_SURVEY_ASSIGNED,
      EVT_SURVEY_UNASSIGNED,
      EVT_SURVEY_COMPLETED,
      EVT_USER_STATUS_UPDATED,
      EVT_PERMISSION_CHANGED,
      EVT_ENTERPRISE_FEATURES_CHANGED,
      EVT_USER_MISSED_CALLS_UPDATED,
      EVT_USER_NOTIFICATIONS_UPDATED,
    ],
    syncName: 'AppContainer',
  })

  // Globally capture notifications paused status
  ;(() => {
    window.projectConfig.notificationsPaused =
      (userQueryContext &&
        userQueryContext.data &&
        userQueryContext.data.me &&
        userQueryContext.data.me.notificationsStatus &&
        userQueryContext.data.me.notificationsStatus.paused) ||
      false
  })()

  // FIXME: (jh) Maybe this can be taken out; can't remember why I added it
  // specifically here
  useSyncEvent(EVT_ENTERPRISE_FEATURES_CHANGED, refetchMe)

  // Query for updated announcements
  useSyncQuery(CURRENT_USER_QUERY, {
    syncEventNames: [EVT_USER_ANNOUNCEMENT_UPDATED],
    syncName: 'AppContainer[EVT_USER_ANNOUNCEMENT_UPDATED]',
    afterSync: event => {
      // FIXME: This isn't a good way to do this, we could be ringing or receiving an incoming call but not on the call yet, so we don't want to show the notification then.
      // I'm leaving as we need to refactor the callManager to make call state available everywhere.
      // Also, not using RR because we haven't hit the 'call' route yet.
      if (event.new_announcement && !window.location.href.includes('/call/')) {
        showAnnouncementNotification({ event, history: rest.history })
      }
    },
  })

  // FIXME: Move this into user context
  const { user, enterpriseLogo } = useMemo(() => {
    const user = userQueryContext && userQueryContext.data && userQueryContext.data.me

    const enterpriseLogo = user && user.enterprise && user.enterprise.enterpriseLogo

    return {
      user,
      enterpriseLogo,
    }
  }, [userQueryContext])

  // Automatically manage other users' status in their Apollo cache
  useUserStatusSync()

  // Sync updated FCM token with BE, used for offline desktop notifications (where available)
  useCaptureFcmTokenModule()

  // Listen for route changes and set Firebase screen accordingly
  useEffect(() => {
    const unlisten = rest.history.listen(location => {
      Firebase.setCurrentScreen(location.pathname)
    })

    return unlisten
  }, [rest, rest.history.location])

  const { isServerOnline } = useNetworkConnectionState()
  if (!isServerOnline) {
    return <ServerIssue />
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <AppContainerView {...rest} userQueryContext={userQueryContext} enterpriseLogo={enterpriseLogo} />
    </CurrentUserContext.Provider>
  )
}

function ThreadSocketListener() {
  useUnreadMessagesCountUpdater()

  return null
}

const d = debug('project:AppContainer') // <- creating the namespace

function AppContainerView({ userQueryContext, callingFeatureState, callingFeatureFunctions, enterpriseLogo, ...rest }) {
  const user = useCurrentUser()

  const [micCamAvailable, setMicCamAvailable] = useState(false)

  useEffect(() => {
    LocalUIParticipant.fetchIsMediaDevicePresent()
      .then(isPresent => {
        setMicCamAvailable(isPresent)
      })
      .catch(err => console.error(err))
  }, [])

  // Setup Firebase analytics for this user
  useEffect(() => {
    if (user) {
      Firebase.setUserId(user.id)

      const userProps = {
        enterpriseId: user.enterprise.id || 'not found',
        enterpriseName: user.enterprise.name || 'not found',
        environment: process.env.REACT_APP_BUILD_ENV,
        graphqlUrl: process.env.REACT_APP_API_URL,
      }

      Firebase.setUserProperties(userProps)
    }
  }, [user])

  const uiV2 = user && user.enterprise && user.enterprise.uiV2

  // Original state structure from class-based component
  const [state, setState] = useObjectState({
    activeMenuItem: null,
  })

  const awayAfterOverride = useMemo(() => {
    // Add a way to override the away time for QA and testing.
    let awayAfterOverride = null

    if (process.env.REACT_APP_BUILD_ENV !== 'production') {
      const override = localStorage.getItem('awayAfter')

      if (override) {
        awayAfterOverride = parseFloat(override)
      }
    }

    return awayAfterOverride
  }, [])

  const { isOneClick } = useIsOneClick() // REMOVE: after v2 live

  const handleNetworkStatusChanged = useCallback(online => {
    d(`network online status changed=${online ? 'online' : 'offline'}`)
  }, [])

  const handleAway = useCallback(() => {
    if (rest && rest.history) {
      // Handle any client specific behavior.
      if (AuthUtils.getSSODetails().ssoCustomer === SSO_CUSTOMERS.COREO_UEE) {
        rest.history.push({ pathname: '/app/locked-coreo-uee', state: { previousUrl: rest.location.pathname } })
        return
      }

      rest.history.push('/logout')
      AuthUtils.logout()
    }
  }, [rest])

  const handleShowMenu = useCallback(() => {
    setState({ showMenu: true })
  }, [setState])

  const handleHideMenu = useCallback(() => {
    setState({ showMenu: false })
  }, [setState])

  const { loading, error, data, networkStatus } = userQueryContext

  if (error) {
    // Note: all the following is to handle network outage gracefully
    // and try to show the screen they are on w/o failing due to api error

    // general unhandled error (while network online)
    if (error && !error.message.includes('Network error: Failed to fetch')) {
      d(`unhandled error, showing error page`)
      return <ErrorPage error={error} />
    }

    // fetch error (api server down) AND no data
    // user is offline and tried to query something
    if (!data && error.message.includes('Network error: Failed to fetch')) {
      d(`fetch error and no cache data, showing server issue page`)
      return <ServerIssue />
    }

    // fetch error (api server down) NOT a fetch error
    // user is online and tried to query something that failed
    if (!data && !error.message.includes('Network error: Failed to fetch')) {
      d(`bad query, showing error page`)
      return <ErrorPage error={error} />
    }

    d(`error happened but no action taken error=%O`, error)
  }
  // networkStatus 2 happens when fetching information when enterprise setting changes
  if (!data || (loading && networkStatus !== 6 && networkStatus !== 4 && networkStatus !== 2)) {
    return <MainLoader />
  }

  // update user context to include cam/mic availability
  user.micCamAvailable = micCamAvailable

  return (
    <ThreadsController>
      <ThreadSocketListener />
      <CallingFeatureProvider user={user} {...rest}>
        <SidebarProvider>
          <CallingFeatureConsumer>
            {({ callingFeatureState, callingFeatureFunctions, callManager }) => {
              return (
                // REMOVE: MenuContainer can be removed when v2 goes live
                <MenuContainer onHide={handleHideMenu} visible={!uiV2 && state.showMenu} {...rest}>
                  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                    {uiV2 && <SidebarContainer {...rest} />}

                    <Presence />
                    <DocTitle />
                    <Favicon imgUrl={user && user.enterprise && user.enterprise.favicon} />
                    <CheckPasswordExpiration />
                    <NetworkStatus statusChanged={handleNetworkStatusChanged} />

                    {/* Rendering AwayStatus starts the timer.
                      Do NOT render when on a call or the users call will be interrupted.
                      There is rarely screen activity when on a call */}
                    {!callingFeatureState.callInProgress && (
                      <AwayStatus
                        awayAfter={awayAfterOverride || (user && user.enterprise && user.enterprise.careAwayMinutes)}
                        onAway={handleAway}
                        skip={window.location.pathname === URL_LOCATIONS.COREO_LOCKED}
                      />
                    )}

                    {uiV2 ? <TNContainer {...rest} /> : <TNContainerV1 {...rest} />}

                    {/*REMOVE: after v2 live*/}
                    {!uiV2 && !isOneClick && <AppHeaderContainer onShowMenu={handleShowMenu} {...rest} />}

                    {/* If "audio calling" feature is enabled, show this call selection */}
                    {uiV2 ? (
                      <CallNotice.ChooseType
                        show={callingFeatureState.showCallOptions}
                        onCancel={callingFeatureFunctions.handleCancelCall}
                        onVideo={() => callingFeatureFunctions.handleInitiateVideoCall(callingFeatureState.calleeUser)}
                        onAudio={() => callingFeatureFunctions.handleInitiateAudioCall(callingFeatureState.calleeUser)}
                      />
                    ) : (
                      <ChooseCallType
                        show={callingFeatureState.showCallOptions}
                        onCancel={callingFeatureFunctions.handleCancelCall}
                        onHandleVideoCallStart={() =>
                          callingFeatureFunctions.handleInitiateVideoCall(callingFeatureState.calleeUser)
                        }
                        onHandleAudioCallStart={() =>
                          callingFeatureFunctions.handleInitiateAudioCall(callingFeatureState.calleeUser)
                        }
                      />
                    )}

                    <AudioCallManager
                      user={user}
                      calleeUser={callingFeatureState.calleeUser}
                      showCallOptions={callingFeatureState.showCallOptions}
                      onFinishCall={callingFeatureFunctions.handleCancelCall}
                      initiateCall={callingFeatureState.initiateAudioCall}
                    />

                    {/*REMOVE: after v2 live*/}
                    {isOneClick ? (
                      <Switch>
                        {/* ******************* */}
                        {/* MESSAGES ************ */}
                        {/* ******************* */}
                        <Route exact path="/app/messages/new" render={() => <ThreadNewContainer />} />
                        <Route exact path="/app/messages/new-group" render={() => <ThreadOptionsContainer />} />
                        <Route exact path="/app/messages/:threadId/options" render={() => <ThreadOptionsContainer />} />
                        <Route
                          path="/app/messages"
                          render={() => {
                            if (!featureSecureMessages(user)) return <Redirect to="/app/restricted" />

                            return <Chat />
                          }}
                        />

                        {/* *********************** */}
                        {/* TERMS AND NOTICES PAGES */}
                        {/* *********************** */}
                        <Route path="/app/terms-welcome" render={props => <TNNoticeContainer {...props} />} />
                        <Route path="/app/terms-and-notices" render={props => <TNDisplayContainer {...props} />} />
                        <Route path="/app/terms-decline" render={props => <TNDeclineContainer {...props} />} />

                        {/* ******************* */}
                        {/* NOT ALLOWED ******* */}
                        {/* ******************* */}
                        {/* This is displayed when a user has no permissions in the app */}
                        <Route
                          exact
                          path="/app/restricted"
                          render={() => {
                            if (uiV2) return <Misc.NotAuthorized />
                            return <UnauthorizedPage />
                          }}
                        />
                        <Route path="*" render={() => <Redirect to={`/app/messages`} push />} />
                      </Switch>
                    ) : (
                      <Switch>
                        <Route
                          exact
                          path="/app"
                          render={props => {
                            return <Redirect to={`/app/dashboard`} push />
                          }}
                        />

                        {/* ************************************ */}
                        {/* Special customer routes ************ */}
                        {/* ************************************ */}
                        <Route exact path="/app/locked-coreo-uee" render={() => <CoreoLockedContainer />} />

                        {/* ******************* */}
                        {/* CALL ************** */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/call/:room"
                          render={props => {
                            if (uiV2) {
                              return (
                                <VideoContainer
                                  onCallStarted={callingFeatureFunctions.handleCallStarted}
                                  onHangup={callingFeatureFunctions.handleHangup}
                                  maxParticipantsAmount={callManager ? callManager.state.maxParticipants : 1}
                                />
                              )
                            }

                            return (
                              <VideoContainerV1
                                callComplete={callingFeatureState.callComplete}
                                displayName={user.displayName}
                                onHangup={callingFeatureFunctions.handleHangup}
                                onCallStarted={callingFeatureFunctions.handleCallStarted}
                                onAddCall={callingFeatureFunctions.handleAddCaller}
                                // FIXME: Is it a bug that the callback for onAddCaregiverToCall is the same as previous onAddCall?
                                onAddCaregiverToCall={callingFeatureFunctions.handleAddCaller}
                                onAddInterpreterToCall={callingFeatureFunctions.handleInitiateInterpreterCall}
                                awaitingPickup={callingFeatureState.awaitingPickup}
                                enterpriseLogo={enterpriseLogo}
                                videoServerConnectionData={Socket.getVideoConnectionData()}
                                patientInCallId={callingFeatureState.patientInCallId}
                                patientInCallUserId={callingFeatureState.patientInCallUserId}
                                calleeRelatedUser={callingFeatureState.calleeRelatedUser}
                                maxParticipantsAmount={callManager ? callManager.state.maxParticipants : 1}
                                droppedCall={callingFeatureState.droppedCall}
                                {...props}
                              />
                            )
                          }}
                        />

                        {/* ******************* */}
                        {/* PATIENT ************ */}
                        {/* ******************* */}
                        <Route
                          // v2 route
                          exact
                          path="/app/search-patients"
                          render={() => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return <PatientSearchContainer />
                          }}
                        />

                        {/* NOTE: All patientID below reflect the patient USER id */}
                        {/* caregiverId reflects the actual caregiver id, not the USER id */}

                        <Route
                          // v2
                          exact
                          path={[
                            '/app/enterprises/:enterpriseId/patients',
                            '/app/enterprises/:enterpriseId/patients/:tab(all|active|invitePending)',
                            '/app/patients',
                          ]}
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return <PatientsContainer />
                          }}
                        />

                        <Route
                          //v2
                          // Note: All patient routes are nested in PatientContainer
                          path="/app/enterprises/:enterpriseId/patients/:patientId"
                          render={() => {
                            return <V2PatientContainer />
                            // return <PatientContainer />
                          }}
                        />

                        <Route
                          // v1
                          exact
                          path="/app/patients/:patientId/caregivers/add/:phone"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return <CaregiverFormContainerV1 {...props} />
                          }}
                        />

                        <Route
                          // v1
                          exact
                          path="/app/patients/:patientId/caregivers/add"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return <CaregiverFormContainerV1 {...props} />
                          }}
                        />

                        <Route
                          // v1
                          exact
                          path="/app/patients/:patientId/caregivers/search"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return <CaregiverSearchContainer {...props} />
                          }}
                        />

                        <Route
                          // v1
                          exact
                          path="/app/enterprises/:enterpriseId/patientsV1/:patientId/caregivers/:caregiverId"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            // v1 route
                            return <CaregiverFormContainerV1 {...props} />
                          }}
                        />

                        <Route
                          // v1
                          path={['/app/enterprises/:enterpriseId/patientsV1', '/app/patientsV1']}
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            return (
                              <PatientsV1
                                {...props}
                                onStartPatientCall={callingFeatureFunctions.handleInitiateCall}
                                onStartCaregiverCall={callingFeatureFunctions.handleInitiateCall}
                                enterpriseLogo={enterpriseLogo}
                              />
                            )
                          }}
                        />

                        {/* ******************* */}
                        {/* DASHBOARD ********* */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/dashboard"
                          render={props => {
                            if (user.enterprise.uiV2) {
                              return <Redirect to="/app/home" />
                            }

                            return (
                              <Dashboard
                                onStartCall={callingFeatureFunctions.handleInitiateCall}
                                enterpriseLogo={enterpriseLogo}
                                showAssessment={user.surveyCount > 0}
                                {...props}
                              />
                            )
                          }}
                        />

                        {/* ******************* */}
                        {/* HOME      ********* */}
                        {/* ******************* */}
                        <Route
                          path="/app/home"
                          render={props => {
                            // REMOVE: The if can be removed after v2 goes live
                            if (!user.enterprise.uiV2) {
                              return <Redirect to="/app/dashboard" />
                            }

                            return <HomeContainer onMenu={handleShowMenu} {...props} />
                          }}
                        />

                        {/* **************************** */}
                        {/* Interventions      ********* */}
                        {/* **************************** */}
                        <Route
                          exact
                          path="/app/alerts/:patientId"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            // REMOVE: The if can be removed after v2 goes live
                            if (!user.enterprise.uiV2) {
                              return <Redirect to="/app/dashboard" />
                            }

                            return <InterventionContainer />
                          }}
                        />

                        <Route
                          exact
                          path="/app/alerts"
                          render={props => {
                            if (!canCallPatients(user.permissions)) return <Redirect to="/app/restricted" />

                            // REMOVE: The if can be removed after v2 goes live
                            if (!user.enterprise.uiV2) {
                              return <Redirect to="/app/dashboard" />
                            }

                            return <InterventionsContainer />
                          }}
                        />

                        {/* **************************** */}
                        {/* Notifications      ********* */}
                        {/* **************************** */}
                        <Route
                          exact
                          path="/app/notifications"
                          render={props => {
                            // REMOVE: The if can be removed after v2 goes live
                            if (!user.enterprise.uiV2) {
                              return <Redirect to="/app/dashboard" />
                            }

                            return <NotificationsContainer />
                          }}
                        />

                        {/* ******************* */}
                        {/* EVENTS      ********* */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/events"
                          render={props => {
                            // REMOVE: The if can be removed after v2 goes live
                            if (!user.enterprise.uiV2) {
                              return <Redirect to="/app/dashboard" />
                            }

                            // Redirect to today
                            const today = dayjs()
                            return (
                              <Redirect
                                to={`/app/events/calendar/${today.format('YYYY')}/${today.format('MM')}/${today.format(
                                  'DD'
                                )}`}
                              />
                            )
                          }}
                        />

                        <Route
                          exact
                          path="/app/events/calendar/:year/:month/:day"
                          render={() => <EventDayContainer />}
                        />
                        <Route
                          exact
                          path={['/app/events/calendar/:year', '/app/events/calendar/:year/:month']}
                          render={() => <EventYearContainer />}
                        />
                        {/* Below will be to an events details */}
                        {/* <Route exact path="/app/events/:eventId" render={() => <EventsContainer />} /> */}

                        {/* ******************* */}
                        {/* STAFF ************ */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/staff"
                          render={() => {
                            return <Redirect to="/app/staff/members" />
                          }}
                        />

                        <Route
                          path={['/app/staff/members', '/app/staff/groups']}
                          render={() => {
                            if (!canCallStaff(user.permissions)) return <Redirect to="/app/restricted" />
                            return <StaffContainer />
                          }}
                        />

                        <Route
                          path="/app/staff/:staffId"
                          render={() => {
                            if (!canCallStaff(user.permissions)) return <Redirect to="/app/restricted" />
                            return <StaffProfileContainer />
                          }}
                        />

                        <Route
                          path="/app/staff"
                          render={() => {
                            if (!canCallStaff(user.permissions)) return <Redirect to="/app/restricted" />
                            return <StaffContainer />
                          }}
                        />

                        <Route
                          exact
                          path="/app/staffV1"
                          render={props => {
                            if (!canCallStaff(user.permissions)) return <Redirect to="/app/restricted" />

                            return (
                              <StaffContainerV1
                                onStartCall={callingFeatureFunctions.handleInitiateCall}
                                canMessage={featureSecureMessages(user)}
                                canCall={featureVirtualCalls(user)}
                                {...props}
                              />
                            )
                          }}
                        />

                        {/* ******************* */}
                        {/* GROUPS ************ */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/groups/:groupId"
                          render={props => {
                            if (!canCallStaff(user.permissions)) return <Redirect to="/app/restricted" />

                            if (uiV2) {
                              return <GroupContainer />
                            }

                            return (
                              <GroupsContainerV1
                                onStartCall={callingFeatureFunctions.handleInitiateCall}
                                onStartGroupCall={callingFeatureFunctions.handleInitiateGroupCall}
                                enterpriseLogo={enterpriseLogo}
                                canMessage={featureSecureMessages(user)}
                                canCall={featureVirtualCalls(user)}
                                {...props}
                              />
                            )
                          }}
                        />

                        {/* ******************* */}
                        {/* MESSAGE ************ */}
                        {/* ******************* */}
                        <Route
                          exact
                          path="/app/messages/new"
                          render={props => {
                            return <ThreadNewContainer />
                          }}
                        />

                        <Route
                          exact
                          path="/app/messages/new-group"
                          render={props => {
                            return <ThreadOptionsContainer />
                          }}
                        />

                        <Route
                          exact
                          path="/app/messages/:threadId/options"
                          render={props => {
                            return <ThreadOptionsContainer />
                          }}
                        />

                        <Route
                          path="/app/messages"
                          render={props => {
                            if (!featureSecureMessages(user)) return <Redirect to="/app/restricted" />

                            if (uiV2) {
                              return <Chat />
                            }

                            return <Messages onStartCall={callingFeatureFunctions.handleInitiateCall} {...props} />
                          }}
                        />

                        {/* ************************* */}
                        {/* CALL HISTORY ************ */}
                        {/* ************************* */}
                        <Route
                          path="/app/calls"
                          render={props => {
                            if (!featureVirtualCalls(user)) return <Redirect to="/app/restricted" />

                            if (uiV2) {
                              return <CallsContainer />
                            }

                            // REMOVE: after v2 live
                            return (
                              <CallHistoryContainer
                                onStartCall={callingFeatureFunctions.handleInitiateCall}
                                {...props}
                              />
                            )
                          }}
                        />

                        {/* ************************************** */}
                        {/* ASSESSMENTS ************************** */}
                        {/* ************************************** */}
                        <Route
                          exact
                          path="/app/assessments"
                          render={props => {
                            return <AssessmentsContainer />
                          }}
                        />

                        {/* ************************************** */}
                        <Route
                          exact
                          path="/app/assessments/:assessmentId"
                          render={props => {
                            return <AssessmentContainer />
                          }}
                        />

                        <Route
                          // REMOVE: v1 route
                          exact
                          path="/app/surveys"
                          render={props => {
                            return <AssessmentsContainerV1 surveyCount={user.surveyCount} {...props} />
                          }}
                        />

                        <Route
                          // REMOVE: v1 route
                          exact
                          path="/app/surveys/:assessmentId"
                          render={props => <AssessmentContainerV1 {...props} />}
                        />

                        {/* ************************************** */}
                        {/* ANNOUNCEMENTS  *********************** */}
                        {/* ************************************** */}
                        <Route
                          exact
                          path="/app/announcements"
                          render={props => {
                            if (uiV2) {
                              return <AnnouncementsContainer />
                            }
                            return <AnnouncementListContainer {...props} />
                          }}
                        />

                        <Route
                          exact
                          path="/app/announcements/:id"
                          render={props => {
                            return uiV2 ? <AnnouncementContainer /> : <AnnouncementContainerV1 {...props} />
                          }}
                        />

                        {/* *********************** */}
                        {/* TERMS AND NOTICES PAGES */}
                        {/* *********************** */}
                        <Route
                          path="/app/terms-welcome"
                          render={props => {
                            return uiV2 ? <TNNoticeContainer {...props} /> : <TNNoticeContainerV1 {...props} />
                          }}
                        />
                        <Route
                          path="/app/terms-and-notices"
                          render={props => {
                            return uiV2 ? <TNDisplayContainer {...props} /> : <TNDisplayContainerV1 {...props} />
                          }}
                        />
                        <Route
                          path="/app/terms-decline"
                          render={props => {
                            return uiV2 ? <TNDeclineContainer {...props} /> : <TNDeclineContainerV1 {...props} />
                          }}
                        />

                        {/* ******************* */}
                        {/* NOT ALLOWED ******* */}
                        {/* ******************* */}
                        {/* This is displayed when a user has no permissions in the app */}
                        <Route
                          exact
                          path="/app/restricted"
                          render={() => {
                            if (uiV2) return <Misc.NotAuthorized />
                            return <UnauthorizedPage />
                          }}
                        />

                        {/* ******************* */}
                        {/* 404 - NOT FOUND *** */}
                        {/* ******************* */}
                        <Route
                          render={() => {
                            if (uiV2) return <Misc.NotFound />
                            return <NotFound />
                          }}
                        />
                      </Switch>
                    )}
                  </div>
                </MenuContainer>
              )
            }}
          </CallingFeatureConsumer>
        </SidebarProvider>
      </CallingFeatureProvider>
    </ThreadsController>
  )
}
