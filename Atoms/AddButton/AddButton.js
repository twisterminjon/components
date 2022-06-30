import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

export default class AddButton extends Component {
  static propTypes = {
    /** Function called when the button is clicked */
    onClick: PropTypes.func,

    /** ClassName for the wrapper */
    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }

  render() {
    const { onClick, className, style } = this.props

    return (
      <Button
        className={className}
        style={style}
        primary
        circular
        icon="plus"
        size="big"
        onClick={onClick}
        data-testid="button-add"
      />
    )
  }
}
