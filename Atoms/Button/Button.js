import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button as SemanticButton } from 'semantic-ui-react'
import './Button.css'

export default class Button extends Component {
  static propTypes = {
    /** Text to define button type, defaults to "submit" */
    type: PropTypes.string,
    /** Standard style object */
    style: PropTypes.object,
    /** A button can take the width of its container */
    fluid: PropTypes.bool,
  }
  static defaultProps = {
    type: 'submit',
    style: {},
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
    const { type, style, ...rest } = this.props
    const { isMouseOver, isMouseDown, isFocused } = this.state

    // Because we are using the semantic classes we need to use styles
    // to add our own css (semantic has a higher specificty)
    const buttonStyle = {
      backgroundColor: 'var(--button_color)',
      color: 'var(--dark_black)',
    }

    if (isMouseOver) buttonStyle.backgroundColor = 'var(--button_color_hover)'

    if (isFocused) buttonStyle.backgroundColor = 'var(--button_color_hover)'

    if (isMouseOver && isMouseDown) buttonStyle.backgroundColor = 'var(--button_color_pressed)'

    const styleOverride = { ...style, ...buttonStyle }

    return (
      <SemanticButton
        type={type}
        className="button-custom"
        style={styleOverride}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...rest}>
        {this.props.children}
      </SemanticButton>
    )
  }
}
