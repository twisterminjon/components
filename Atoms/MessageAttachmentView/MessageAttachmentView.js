import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MessageAttachmentView.css'

export default class MessageAttachmentView extends Component {
  static propTypes = {
    /** Content for the attachment */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    /** Called after the attachment is clicked */
    onClick: PropTypes.func,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    onClick: () => {},
    className: '',
    style: {},
  }

  render() {
    const { onClick, children, className, style, ...rest } = this.props

    return (
      <div onClick={onClick} className={`messageattachmentview ${className}`.trim()} style={style} {...rest}>
        {children}
      </div>
    )
  }
}
