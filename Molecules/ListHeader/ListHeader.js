import React from 'react'
import PropTypes from 'prop-types'

import './ListHeader.css'

ListHeader.propTypes = {
  /** Title of section */
  label: PropTypes.string.isRequired,

  /** Children for the content */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default function ListHeader({ label, children, ...rest }) {
  const dataTestId = rest['data-testid']

  return (
    <div className="listheader-container" {...rest}>
      <div className="listheader-titlecontainer">
        <span className="listheader-title" data-testid={dataTestId}>
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}
