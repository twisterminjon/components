import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ButtonIcon extends Component {
  static propTypes = {
    /** Function called when the button is clicked */
    onClick: PropTypes.func,
    /** Style for the button */
    style: PropTypes.object,
    /** className for the button */
    className: PropTypes.string,
  }
  static defaultProps = {
    style: {},
    className: '',
  }

  state = {
    isMouseOver: false,
    isMouseDown: false,
    isFocused: false,
  }

  handleMouseEnter = () => {
    this.setState({ isMouseOver: true })
  }

  handleMouseLeave = () => {
    this.setState({ isMouseOver: false })
  }

  handleMouseDown = () => {
    this.setState({ isMouseDown: true })
  }

  handleMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }

  handleBlur = () => {
    this.setState({ isFocused: false })
  }

  render() {
    const { onClick, children, style, className, ...rest } = this.props
    const { isMouseOver, isMouseDown, isFocused } = this.state

    // Because we are using the semantic classes we need to use styles
    // to add our own css (semantic has a higher specificty)
    const buttonStyles = {
      notHovered: {
        color: 'var(--brandcolor)',
        backgroundColor: 'transparent',
        border: '1px solid rgba(0,0,0,0)',
      },
      hovered: {
        color: 'var(--brandcolor)',
        backgroundColor: 'transparent',
        border: '1px solid var(--brandcolor)',
      },
      mouseDown: {
        color: 'var(--brandcolor)',
        backgroundColor: 'var(--brandcolor_verydark)',
        border: '1px solid var(--brandcolor)',
      },
    }

    let computedStyle = isMouseOver ? buttonStyles.hovered : buttonStyles.notHovered

    if (isFocused) computedStyle = buttonStyles.hovered
    if (isMouseDown) computedStyle = buttonStyles.mouseDown

    const wrapperStyle = { ...computedStyle, ...style }

    return (
      <button
        className={`ui icon button ${className}`}
        style={wrapperStyle}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...rest}>
        {children}
      </button>
    )
  }
}
