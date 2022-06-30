import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './ButtonIconSmall.css'

ButtonIconSmall.propTypes = {
  /** Icon component to render */
  Icon: PropTypes.func.isRequired,
  /** Properties passed to Icon component */
  iconProps: PropTypes.shape({
    /** Color for the icon */
    color: PropTypes.string,
    /** Size, in pixels for the icon */
    size: PropTypes.number,
    // ...
  }),
}

ButtonIconSmall.defaultProps = {
  defaultIconProps: {
    color: 'var(--button_negative_fg)',
    size: 14,
  },
}

export default function ButtonIconSmall({ className, Icon, defaultIconProps, iconProps, ...rest }) {
  iconProps = useMemo(() => ({ ...defaultIconProps, ...iconProps }), [defaultIconProps, iconProps])

  return (
    <button className={classNames(['buttoniconsmall', className])} {...rest}>
      <Icon {...iconProps} />
    </button>
  )
}
