import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextButton extends Component {
  static propTypes = {
    /** Text content for the button */
    content: PropTypes.string.isRequired,
    /** Can be full-width */
    fluid: PropTypes.bool,
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
    fluid: false,
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
    const { onClick, content, style, className, fluid, ...rest } = this.props
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
        className={`ui button ${className} ${fluid ? 'fluid' : ''}`.trim()}
        style={wrapperStyle}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...rest}>
        {content}
      </button>
    )
  }
}
