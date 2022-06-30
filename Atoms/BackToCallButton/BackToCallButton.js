import React from 'react'
import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'

import './BackToCallButton.css'

export default function BackToCallButton(props) {
  const { onClick, children, ...rest } = props
  return (
    <button className="backtocall-button" onClick={onClick} {...rest}>
      <IconChevronLeft color="var(--brandcolor)" />
      <span className="backtocall-text">Back to Call</span>
    </button>
  )
}
