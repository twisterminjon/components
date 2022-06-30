import React, { Component } from 'react'
import Style from '../../../styles/Style'

import './UserCardFavorite.css'

export default class UserCardFavoritePlaceholder extends Component {
  render() {
    const { style } = this.props
    const wrapStyle = { background: Style.favBackground, ...style }

    return (
      <div className="usercardfavorite" style={wrapStyle}>
        <div
          style={{
            height: 32,
            width: 32,
            borderRadius: '50%',
            backgroundColor: Style.favPlaceholder,
            marginBottom: '12px',
          }}
        />
        <div
          style={{
            width: 60,
            height: 14,
            borderRadius: '7px',

            backgroundColor: Style.favPlaceholder,
          }}
        />
      </div>
    )
  }
}
