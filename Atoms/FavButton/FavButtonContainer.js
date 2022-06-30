import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'

import { AuthUtils } from '@shared/helpers'

import UsersQl from '../../../services/UsersQl'

import FavButton from './FavButton'

FavButtonContainer.propTypes = {
  /** Associated User **/
  userId: PropTypes.string.isRequired,
  /** If true will display the icon filled */
  filled: PropTypes.bool,
}

FavButtonContainer.defaultProps = {
  filled: false,
}

export default function FavButtonContainer({ userId, filled, ...rest }) {
  const [isFavorite, setIsFavorite] = useState(filled)

  const loggedInUserId = AuthUtils.getUserId()
  const [toggleFavorite] = useMutation(UsersQl.updateUserFavorite(), {
    onCompleted: ({ updateUser }) => {
      const favorite = updateUser.favorites.find(({ id }) => id === userId)
      setIsFavorite(Boolean(favorite))
    },
  })

  const handleFavorite = useCallback(() => {
    toggleFavorite({
      variables: {
        id: loggedInUserId,
        favorites: isFavorite ? { disconnect: [{ id: userId }] } : { append: [{ id: userId }] },
      },
    })
  }, [isFavorite, loggedInUserId, toggleFavorite, userId])

  return <FavButton filled={isFavorite} onClick={() => handleFavorite()} {...rest} />
}
