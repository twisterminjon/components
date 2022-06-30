import React, { Component } from 'react'

import './UserCardCall.css'

export default class UserCardCallPlaceholder extends Component {
  render() {
    let placeholder = []
    for (let i = 0; i < 10; i++) {
      let time = i * 0.5
      time = time + 's'
      placeholder.push(
        <div className="usercardcall usercardcall-ph" style={{ paddingLeft: 24, animationDelay: time }} key={time}>
          <svg xmlns="http://www.w3.org/2000/svg" width="27" hieght="25" viewBox="0 0 27 25">
            <path
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5px"
              opacity="1"
              isolation="isolate"
              d="M12.16,1.82,9.11,7.88l-6.83,1a1.46,1.46,0,0,0-.83,2.5l4.94,4.72L5.22,22.73a1.49,1.49,0,0,0,2.17,1.55l6.11-3.15,6.11,3.15a1.5,1.5,0,0,0,2.17-1.55l-1.17-6.66,4.94-4.72a1.46,1.46,0,0,0-.83-2.5l-6.83-1L14.84,1.82A1.5,1.5,0,0,0,12.16,1.82Z"
              transform="translate(-0.25 -0.25)"
            />
          </svg>
          <div className="usercardcall-ph-avatar" />
          <div className="usercardcall-ph-text" />
        </div>
      )
    }

    return <div>{placeholder}</div>
  }
}
