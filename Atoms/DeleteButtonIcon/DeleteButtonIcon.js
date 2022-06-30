import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconTrashcan from '../../Atoms/Icons/IconTrashcan'

import './DeleteButtonIcon.css'

export default class DeleteButtonIcon extends Component {
  static propTypes = {
    /** Called after button is clicked */
    onClick: PropTypes.func.isRequired,
    /** Can be disabled */
    disabled: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    disabled: false,
    className: '',
    style: {},
  }

  state = {
    mouseOver: false,
  }

  handleMouseEnter = () => {
    this.setState({ mouseOver: true })
  }

  handleMouseLeave = () => {
    this.setState({ mouseOver: false })
  }

  render() {
    const { onClick, disabled, className, style } = this.props
    const { mouseOver } = this.state

    let backgroundColor = mouseOver ? 'var(--button_color_danger)' : 'transparent'
    let iconColor = mouseOver ? 'var(--black)' : 'var(--button_color_danger)'

    const testId = this.props['data-testid'] ? this.props['data-testid'] : 'delete-button'

    return (
      <div
        className={`deletebuttonicon-wrap ${className}`.trim()}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <button
          aria-label="Delete"
          style={{
            backgroundColor: backgroundColor,
            border: `2px solid ${iconColor}`,
            width: 25,
            height: 25,
          }}
          disabled={disabled}
          className={`deletebuttonicon-button`}
          onClick={onClick}
          data-testid={testId}>
          <IconTrashcan color={iconColor} size={10} />
        </button>
      </div>
    )
  }
}
