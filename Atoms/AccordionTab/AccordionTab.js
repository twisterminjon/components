import React from 'react'
import PropTypes from 'prop-types'

import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import IconChevronRight from '../../Atoms/Icons/IconChevronRight'
import IconChevronUp from '../../Atoms/Icons/IconChevronUp'
import IconChevronDown from '../../Atoms/Icons/IconChevronDown'
import IconTimes from '../../Atoms/Icons/IconTimes'

import './AccordionTab.css'

AccordionTab.propTypes = {
  /** The label for the accordion */
  label: PropTypes.string.isRequired,

  /** Called after the accordion is activated */
  onActivate: PropTypes.func.isRequired,

  /** Can be inverted */
  inverted: PropTypes.bool,

  /** Can show the icon in different directions */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'times']).isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
AccordionTab.defaultProps = {
  inverted: false,
  className: '',
  style: {},
}

export default function AccordionTab({ label, direction, inverted, onActivate, className = '', style }) {
  const iconStyle = { marginRight: 16 }
  const iconColor = inverted ? 'var(--appheader_bg)' : 'var(--appheader__nav__button_fg)'
  const icons = {
    up: <IconChevronUp style={iconStyle} color={iconColor} />,
    down: <IconChevronDown style={iconStyle} color={iconColor} />,
    left: <IconChevronLeft style={iconStyle} color={iconColor} />,
    right: <IconChevronRight style={iconStyle} color={iconColor} />,
    times: <IconTimes size={16} style={iconStyle} color={iconColor} />,
  }
  let renderIcon = icons[direction] || icons.up

  const invertedClass = inverted ? 'accordiontab--dark' : ''
  return (
    <button
      className={`accordiontab ${invertedClass} ${className}`.trim()}
      style={style}
      onClick={onActivate}
      data-testid={`accordion-${label}`}>
      <span>{label}</span>
      {renderIcon}
    </button>
  )
}
