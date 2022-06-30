import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import IconDownload from '../../Atoms/Icons/IconDownload'

import './MessageAttachmentBanner.css'

export default class MessageAttachmentBanner extends Component {
  static propTypes = {
    /** Called after the close button is clicked */
    onClose: PropTypes.func.isRequired,
    /** Called after the download button is clicked */
    onDownload: PropTypes.func.isRequired,
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
    const { onClose, onDownload, className, style, ...rest } = this.props

    return (
      <div className={`messageattachmentbanner ${className}`.trim()} style={style} {...rest}>
        <ButtonIcon onClick={onClose} data-testid="attachment-close">
          <IconChevronLeft color="var(--messagepage__sent_fg)" style={{ width: 12, height: 21 }} />
        </ButtonIcon>
        <ButtonIcon onClick={onDownload} data-testid="attachment-download">
          <IconDownload color="var(--messagepage__sent_fg)" />
        </ButtonIcon>
      </div>
    )
  }
}
