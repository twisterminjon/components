import React from 'react'
import PropTypes from 'prop-types'

import './ThreadListAccordion.css'
import Button from '../../Atoms/Button/Button'

ThreadListAccordion.propTypes = {
  /** A name for the control, will be included with on onActivate property */
  name: PropTypes.string.isRequired,

  /** The label for the accordion */
  label: PropTypes.string.isRequired,

  /** Function to create a new Group */
  onClickGroup: PropTypes.func.isRequired,

  /** Primary content. */
  children: PropTypes.node,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
ThreadListAccordion.defaultProps = {
  renderControls: null,
  className: '',
  style: {},
}

export default function ThreadListAccordion({ name, label, children, onClickGroup, className = '', style }) {
  return (
    <div className="messagelistaccordion-wrap">
      <div
        className={`messagelistaccordion ${className}`.trim()}
        style={style}
        data-testid={`message-list-accordion-${name}`}>
        <span>{label}</span>
        <Button
          data-testid="message-list-add-group"
          size="medium"
          style={{ fontSize: '12px !important' }}
          onClick={onClickGroup}>
          Add Group
        </Button>
      </div>
      {children && (
        <div className={`messagelistaccordion-content`.trim()} data-testid={`message-list-${name}-content`}>
          {children}
        </div>
      )}
    </div>
  )
}
