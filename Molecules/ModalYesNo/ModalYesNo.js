import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { find } from 'lodash-es'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalYesNo extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    icon: PropTypes.oneOf(['info', 'error', 'question', 'delete', 'save', 'stop']).isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onYes: PropTypes.func.isRequired,
    onNo: PropTypes.func.isRequired,
    defaultIsConfirm: PropTypes.bool,
  }
  static defaultProps = {
    icon: 'info',
    defaultIsConfirm: true,
  }

  iconToText = iconName => {
    const icons = [
      { icon: 'info', text: 'info' },
      { icon: 'error', text: 'times' },
      { icon: 'question', text: 'question' },
      { icon: 'delete', text: 'trash alternate outline' },
      { icon: 'save', text: 'save outline' },
      { icon: 'stop', text: 'ban' },
    ]
    return find(icons, ['icon', iconName]).text
  }

  render() {
    const { show, icon, title, message, onYes, onNo, defaultIsConfirm } = this.props

    const iconName = icon ? this.iconToText(icon) : null

    return (
      <Modal open={show} closeOnEscape={false} closeOnDimmerClick={false} basic size="small">
        <Header icon={iconName} content={title} />
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={onNo} autoFocus={!defaultIsConfirm}>
            <Icon name="remove" /> No
          </Button>
          <Button color="blue" inverted onClick={onYes} autoFocus={defaultIsConfirm}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
