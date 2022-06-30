import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class HintButton extends Component {
  static propTypes = {
    /** Text to show in Popup */
    message: PropTypes.string,
  }
  static defaultProps = {
    message: '',
  }

  render() {
    const { message, style } = this.props

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : 'input-hint-button'

    return (
      <Popup
        trigger={<Icon name="question" circular fitted style={style} size="small" data-testid={dataTestId} />}
        content={message}
      />
    )
  }
}
