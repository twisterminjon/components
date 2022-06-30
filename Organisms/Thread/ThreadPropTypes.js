import PropTypes from 'prop-types'

export const SystemMessage = {
  USER_ADDED: 'USER_ADDED',
}

export const SystemMessageValues = Object.values(SystemMessage)

export const SystemMessageType = PropTypes.oneOf(SystemMessageValues)

export const ThreadPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  profileImage: PropTypes.string,
  isGroup: PropTypes.bool,
  // members: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     displayName: PropTypes.string,
  //     profileImage: PropTypes.string,
  //     overallStatus: PropTypes.oneOf(USER_STATUS_LIST),
  //     patient: PropTypes.shape({
  //       id: PropTypes.string,
  //     }),
  //     isStaff: PropTypes.bool,
  //     isPatient: PropTypes.bool,
  //     isCaregiver: PropTypes.bool,
  //   })
  // ),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      timestamp: PropTypes.string,
      seen: PropTypes.bool,
      isOwn: PropTypes.bool,
      isSystemMessage: PropTypes.bool,
      systemMessageType: SystemMessageType,
      sender: PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        profileImage: PropTypes.string,
      }),
      attachments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          thumbnail: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
})
