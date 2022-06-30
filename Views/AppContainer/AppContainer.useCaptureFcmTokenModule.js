import { useCallback, useEffect } from 'react'
import { FirebaseMessaging, EVT_FIREBASE_TOKEN_CHANGED } from '@shared/helpers'
import { useMutation } from 'react-apollo'
import AuthQl from '../../../services/AuthQl'
import debug from 'debug'

const d = debug('project:AppContainer.useCaptureFcmTokenModule')

/**
 * Listen for FirebaseMessaging token updates and use update the devices id token
 *
 * This uses the following flow:
 * - User allows sending desktop notifications
 * - FirebaseMessaging sets up firebase and notifies when token is available
 * - Update BE to use new token and inform that this device is using server push notifications
 **/
export default function useCaptureFcmToken() {
  const [updateToken] = useMutation(AuthQl.updateToken())

  /**
   * Syncs FCM token w/ BE, for use in offline notifications.
   *
   * @param {string} fcmToken
   * @return {Promise<void>}
   */
  const updateDeviceId = useCallback(
    fcmToken =>
      updateToken({
        variables: {
          deviceId: fcmToken,
          // Updating the platform to 'web-chrome' informs the BE that this device is now allowed to receive server push notifications
          // Note: This is not specific to the 'chrome' browser, it applies to any browser that can receive server push notifications.
          platform: 'web-chrome',
        },
      })
        .then(() => {
          d(`Successfully updated FCM token "${fcmToken}" with the BE`)
        })
        .catch(console.error),
    [updateToken]
  )

  useEffect(() => {
    const token = FirebaseMessaging.getToken()
    if (token) {
      updateDeviceId(token)
    }
    d('Subscribing to FirebaseMessaging token changes')
    FirebaseMessaging.on(EVT_FIREBASE_TOKEN_CHANGED, updateDeviceId)

    return () => {
      FirebaseMessaging.off(EVT_FIREBASE_TOKEN_CHANGED, updateDeviceId)
    }
  }, [updateDeviceId])
}
