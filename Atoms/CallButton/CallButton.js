import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './CallButton.css'

export default class CallButton extends Component {
  static propTypes = {
    /** Children for the button content */
    children: PropTypes.node.isRequired,
    /** Name used for aria-label */
    name: PropTypes.string.isRequired,
    /** Size of the call button */
    size: PropTypes.oneOf(['small', 'medium']),
    /** Color for the button */
    color: PropTypes.string.isRequired,
    /** If true will display as a ghost style */
    ghost: PropTypes.bool,
    /** ghostOpacity */
    ghostOpacity: PropTypes.number,
    /** Function for onClick */
    onClick: PropTypes.func,
    /** Disabled */
    disabled: PropTypes.bool,
    /** If true, will display in a dimmed state */
    dimmed: PropTypes.bool,
  }
  static defaultProps = {
    ghost: false,
    ghostOpacity: 0,
    size: 'medium',
    onClick: () => {},
    disabled: false,
    dimmed: false,
  }

  state = {
    mouseDown: false,
  }

  handleMouseDown = () => {
    if (!this.props.disabled) this.setState({ mouseDown: true })
  }

  handleMouseUp = () => {
    this.setState({ mouseDown: false })
  }

  render() {
    const { color, name, onClick, size, ghost, children, disabled, ghostOpacity, dimmed } = this.props
    const { mouseDown } = this.state

    // NOTE: Just want to discuss the disabled behavior in this button.
    // There is no visual indicator for disabled. This is because of the way we allow
    // a prop for the 'ghost' display. Disabling should 'dim' whatever color is passed in
    // when disabled and work for both solid and ghost.
    //
    // I've passed disabled to the button now. But none of the parent components disable this
    // button. As it is only used on call screens there is no use case for it to be disabled.
    //
    // ADD CALL BUTTON may have a use case, but it should not be shown if a user can't
    // add a third party caller.

    let buttonColor = color

    let backgroundColor = ghost ? `rgba(255, 255, 255, ${ghostOpacity})` : buttonColor
    let iconColor = ghost ? buttonColor : 'black'

    const buttonSize = size === 'small' ? 45 : 64

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { color: iconColor }))

    const buttonClickClass = mouseDown ? 'callbutton-down' : ''

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : `button-${name}`

    return (
      <button
        aria-label={name}
        style={{
          backgroundColor: backgroundColor,
          border: `1px solid ${buttonColor}`,
          width: buttonSize,
          height: buttonSize,
          opacity: dimmed ? 0.5 : 1,
        }}
        disabled={disabled}
        className={`callbutton-button ${buttonClickClass}`}
        data-testid={dataTestId}
        onClick={onClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}>
        {childrenWithProps}
      </button>
    )
  }
}
