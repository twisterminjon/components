import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './UserCardCaregiver.css'

export default class UserCardCaregiverPlaceholder extends Component {
  static propTypes = {
    count: PropTypes.number,
  }
  static defaultProps = {
    count: 10,
  }

  render() {
    let placeholder = []
    for (let i = 0; i < this.props.count; i++) {
      let time = i * 0.5
      time = time + 's'
      placeholder.push(
        <div
          className="usercardcaregiver usercardcaregiver-ph"
          style={{ paddingLeft: 24, animationDelay: time }}
          key={time}>
          <div className="usercardcaregiver-ph-avatar" />
          <div className="usercardcaregiver-ph-text" />
        </div>
      )
    }

    return <div>{placeholder}</div>
  }
}
