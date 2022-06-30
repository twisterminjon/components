import React from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import { useMutation } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'

import ProfileImageUploadButton from '../../Molecules/ProfileImageUploadButton/ProfileImageUploadButton'

import './PatientDetails.css'

import debug from 'debug'
const d = debug('project:PatientPicEditor')

PatientPicEditor.propTypes = {
  /** A user to edit pic for */
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,

  /** Class for the outer component wrapper */
  className: PropTypes.string,

  /** Style for the outer component wrapper */
  style: PropTypes.object,
}

PatientPicEditor.defaultProps = {}

const UPDATE_PROFILE_PIC_MUTATION = UsersQl.updateProfilePic()
const REMOVE_PROFILE_PIC_MUTATION = UsersQl.removeProfilePic()

export default function PatientPicEditor({ user, className, style }) {
  const [updateProfilePic, { loading }] = useMutation(UPDATE_PROFILE_PIC_MUTATION)
  const [removeProfilePic, { loading: loadingRemovePic }] = useMutation(REMOVE_PROFILE_PIC_MUTATION)

  const handleProfilePicUpload = file => {
    updateProfilePic({
      variables: {
        file,
        userID: user.id,
      },
    }).catch(e => {
      toast.warn('Sorry, the file could not be uploaded. Please try another file.')
      d(`profile image not uploaded=%O`, e)
    })
  }

  const handleProfilePicRemove = () => {
    removeProfilePic({
      variables: {
        userID: user.id,
      },
    })
      .then(() => {
        toast.info('Your profile picture has been removed')
      })
      .catch(e => {
        toast.warn('Sorry, the file could not be uploaded. Please try another file.')
        d(`profile image not uploaded=%O`, e)
      })
  }

  return (
    <ProfileImageUploadButton
      showOptions={user.profileImage !== ''}
      loading={loading || loadingRemovePic}
      loadingRemove={loadingRemovePic}
      onSave={handleProfilePicUpload}
      onRemove={handleProfilePicRemove}
      className={className}
      style={style}
    />
  )
}
