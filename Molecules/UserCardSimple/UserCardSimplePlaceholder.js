import React, { Component } from 'react'

import './UserCardSimple.css'

export default class UserCardSimplePlaceholder extends Component {
  render() {
    const { className } = this.props

    // FIXME: This is wrong. didn't realize til after I was done.
    // This should render a single placholder.
    // The list of placeholders should be rendered in PatientListPlaceholder duh!
    let placeholder = []
    for (let i = 0; i < 10; i++) {
      let time = i * 0.5
      time = time + 's'
      placeholder.push(
        <div
          className={`usercardsimple usercardsimple-ph ${className}`}
          style={{ paddingLeft: 24, animationDelay: time }}
          key={time}>
          <div className="usercardsimple-ph-avatar" />
          <div className="usercardsimple-ph-text" />
        </div>
      )
    }

    return <div>{placeholder}</div>
  }
}
