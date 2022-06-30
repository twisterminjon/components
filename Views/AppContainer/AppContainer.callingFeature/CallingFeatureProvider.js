import React, { useEffect, useState } from 'react'
import { SwitchboardProvider } from '@shared/providers'
import useCallingFeature from './useCallingFeature'
import CallManager from '../../../Organisms/CallManager/CallManager'
import StorageUtils from '../../../../Helpers/StorageUtils'
import PropTypes from 'prop-types'

export const CallingFeatureContext = React.createContext({})

export const CallingFeatureConsumer = ({ ...props }) => <CallingFeatureContext.Consumer {...props} />

CallingFeatureProvider.propTypes = {
  /** The local user */
  // FIXME: Use shape check?
  user: PropTypes.object.isRequired,
}

export default function CallingFeatureProvider({ children, user, ...rest }) {
  const [callManager, setCallManager] = useState(null)
  const { callingFeatureFunctions, callingFeatureState } = useCallingFeature({ callManager, user, ...rest })

  useEffect(() => {
    const { calleeId, calleeName, patientInCallId, patientInCallUserId } = callingFeatureState
    StorageUtils.setCallManagerAppContainerCache({
      calleeId,
      calleeName,
      patientInCallId,
      patientInCallUserId,
    })
  }, [callingFeatureState])

  // Distinction between CallingFeatureProvider and SwitchboardProvider:
  //
  //  - CallingFeatureProvider exposes lower-level functions / state, which is too complicated for most components to use directly
  //  - SwitchboardProvider exposes abstracted, higher-level functions / state, intended to be easier to use in components
  return (
    <CallingFeatureContext.Provider
      value={{
        callingFeatureFunctions,
        callingFeatureState,
        callManager,
      }}>
      <SwitchboardProvider
        user={user}
        onDial={user => {
          if (user.overallStatus === 'offline' && (user.isPatient || user.isCaregiver)) {
            callingFeatureFunctions.handleInitiateClick2Call({
              userId: user.id,
              ...user,
            })
          } else {
            callingFeatureFunctions.handleInitiateCall(user)
          }
        }}
        onDialGroup={id => {
          callingFeatureFunctions.handleInitiateGroupCall(id)
        }}
        onAddUser={callingFeatureFunctions.handleAddCaller}
        onAddInterpreter={callingFeatureFunctions.handleInitiateInterpreterCall}
        onHangup={callingFeatureFunctions.handleHangup}
        callInProgress={callingFeatureState.callInProgress}
        callState={callingFeatureState}>
        {
          // CallManager is for video call functionality
        }
        {callingFeatureState.isMediaDevicePresentForCalling && (
          <CallManager
            ref={setCallManager}
            user={user}
            callingFeatureFunctions={callingFeatureFunctions}
            callingFeatureState={callingFeatureState}
            {...rest}
          />
        )}

        {
          // TODO: Move audio call handling here
        }

        {children}
      </SwitchboardProvider>
    </CallingFeatureContext.Provider>
  )
}
