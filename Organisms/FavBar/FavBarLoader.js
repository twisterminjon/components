import React, { Component } from 'react'

import UserCardFavoritePlaceholder from '../../Molecules/UserCardFavorite/UserCardFavoritePlaceholder'

export default class FavBarLoader extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="usercardfavorite-shimmer">
        <UserCardFavoritePlaceholder style={{ animation: 'pulse 2s infinite' }} />
        <UserCardFavoritePlaceholder style={{ animation: 'pulse 2s 0.2s infinite' }} />
        <UserCardFavoritePlaceholder style={{ animation: 'pulse 2s 0.4s infinite' }} />
        <UserCardFavoritePlaceholder style={{ animation: 'pulse 2s 0.6s infinite' }} />
      </div>
    )
  }
}
