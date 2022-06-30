import React from 'react'
import PropTypes from 'prop-types'

import IconHamburger from '../../Atoms/Icons/IconHamburger'
import { USER_STATUS_LIST } from '../../../constants'

import './StatusBubbleSettings.css'

StatusBubbleSettings.propTypes = {
  /** The status to to display in the bubble */
  status: PropTypes.oneOf(USER_STATUS_LIST).isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

StatusBubbleSettings.defaultProps = {
  className: '',
  style: {},
}

export default function StatusBubbleSettings({ status, className, style }) {
  const colorClass = `statusbubble--${status}`

  return (
    <div className={`statusbubblesettings ${colorClass} ${className}`.trim()} style={style}>
      <IconHamburger size={9} color="var(--white)" />
    </div>
  )
}
