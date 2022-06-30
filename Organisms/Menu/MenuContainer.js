import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import { useMutation, useLazyQuery } from 'react-apollo'
import AuthQl from '../../../services/AuthQl'
import UsersQl from '../../../services/UsersQl'
import { CurrentUserContext } from '@shared/providers'
import { AuthUtils } from '@shared/helpers'

import SettingsFormContainer from '../SettingsForm/SettingsFormContainer'
import UpdatePhoneFormContainer from '../UpdatePhoneForm/UpdatePhoneFormContainer'
import TNDisplayType from '../TNNotice/TNDisplay/TNDisplayType'
import ProfileImageUploadModal from '../../Molecules/ProfileImageUploadModal/ProfileImageUploadModal'
import ModalLogoutAllToast from '../../Molecules/ModalLogoutAllToast/ModalLogoutAllToast'

import Menu from './Menu'

import debug from 'debug'
const d = debug('project:MenuContainer')

MenuContainer.propTypes = {
  /** Menu can be shown or hidden */
  visible: PropTypes.bool.isRequired,

  /** Called after the hide menu action */
  onHide: PropTypes.func.isRequired,

  /** Content of the main app */
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
}

const UPDATE_PROFILE_PIC_MUTATION = UsersQl.updateProfilePic()
const REMOVE_PROFILE_PIC_MUTATION = UsersQl.removeProfilePic()
const GET_ACTIVE_CREDENTIALS = AuthQl.getActiveCredentials()

export default function MenuContainer({ visible, onHide, children, ...rest }) {
  const [showSettings, setShowSettings] = useState(false)
  const [showUpdatePhone, setShowUpdatePhone] = useState(false)
  const [showPicEditor, setShowPicEditor] = useState(false)
  const [showLogoutAllModal, setShowLogoutAllModal] = useState(false)
  const currentUser = useContext(CurrentUserContext)

  const [updateProfilePic, { loading }] = useMutation(UPDATE_PROFILE_PIC_MUTATION)
  const [removeProfilePic, { loading: loadingRemovePic }] = useMutation(REMOVE_PROFILE_PIC_MUTATION)
  const [handleLogoutDecision] = useLazyQuery(GET_ACTIVE_CREDENTIALS, {
    variables: {
      id: currentUser.id,
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({ activeCredentials } = {}) => {
      if (activeCredentials && activeCredentials.length > 1) {
        setShowLogoutAllModal(true)
      } else {
        handleLogout()
      }
    },
    onError: () => {
      // If request fails for some reason, do at least something
      handleLogout()
    },
  })

  const handleMenuItem = data => {
    switch (data.id) {
      case 'edit-profile-pic':
        setShowPicEditor(true)
        break

      case 'calls':
        rest.history.push(`/app/calls`)
        onHide()
        break

      case 'settings':
        setShowSettings(true)
        onHide()
        break

      case 'announcements':
        onHide()
        rest.history.push('/app/announcements')
        break

      case 'update-password':
        rest.history.push('/update-password', { updating: true })
        break

      case 'update-phone-number':
        setShowUpdatePhone(true)
        onHide()
        break

      case 'terms':
        onHide()
        rest.history.push('/app/terms-and-notices', { type: TNDisplayType.OPT_OUT })
        break

      case 'sign-out':
        handleLogoutDecision()
        break

      default:
        break
    }
  }
  const handleLogout = () => {
    AuthUtils.logout()

    rest.history.push('/login')
  }

  const handleLogoutAll = () => {
    AuthUtils.logoutAll()

    rest.history.push('/login')
  }

  const handleCancelLogout = () => {
    setShowLogoutAllModal(false)
  }

  const handleItemClose = () => {
    setShowSettings(false)
    setShowUpdatePhone(false)
    setShowPicEditor(false)
    setShowLogoutAllModal(false)
  }

  const handleProfilePicUpload = file => {
    updateProfilePic({
      variables: {
        file,
        userID: AuthUtils.getUserId(),
      },
    })
      .then(() => {
        handleItemClose()
      })
      .catch(e => {
        toast.warn('Sorry, the file could not be uploaded. Please try another file.')
        d(`profile image not uploaded=%O`, e)
      })
  }

  const handleProfilePicRemove = () => {
    removeProfilePic({
      variables: {
        userID: AuthUtils.getUserId(),
      },
    })
      .then(() => {
        handleItemClose()
        toast.info('Your profile picture has been removed')
      })
      .catch(e => {
        toast.warn('Sorry, the file could not be uploaded. Please try another file.')
        d(`profile image not uploaded=%O`, e)
      })
  }

  if (currentUser.enterprise.uiV2) {
    return <>{children}</>
  }

  return (
    <React.Fragment>
      <Menu visible={visible} onHide={onHide} onMenuItem={handleMenuItem}>
        {children}
      </Menu>

      <SettingsFormContainer show={showSettings} onClose={handleItemClose} />

      <UpdatePhoneFormContainer show={showUpdatePhone} onClose={handleItemClose} />

      {showPicEditor && (
        <ProfileImageUploadModal
          showOptions={currentUser.profileImage !== ''}
          loading={loading}
          loadingRemove={loadingRemovePic}
          onClose={handleItemClose}
          onSave={handleProfilePicUpload}
          onRemove={handleProfilePicRemove}
        />
      )}

      <ModalLogoutAllToast
        show={showLogoutAllModal}
        onLogoutThisDevice={handleLogout}
        onLogoutAll={handleLogoutAll}
        onCancel={handleCancelLogout}
      />
    </React.Fragment>
  )
}
