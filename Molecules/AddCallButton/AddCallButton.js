import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconPlus from '../../Atoms/Icons/IconPlus'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'
import AddCallMenu from '../../Organisms/AddCallMenu/AddCallMenu'
import ModalToast from '../../Atoms/ModalToast/ModalToast'

import './AddCallButton.css'
import Styles from '../../../styles/Style'

export default class AddCallButton extends Component {
  static propTypes = {
    /** If true, will show the button label */
    showLabel: PropTypes.bool,
    /** Caregiver button can be disabled */
    enableCaregivers: PropTypes.bool,
    /** Interpreters can be disabled */
    enableInterpreters: PropTypes.bool,
    /** Called to add a staff member */
    onAddStaff: PropTypes.func.isRequired,
    /** Called after the caregivers button is clicked */
    onAddCaregiver: PropTypes.func.isRequired,
    /** Called to add an intepreter */
    onAddInterpreter: PropTypes.func.isRequired,
    /** Class for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
    /** Indicating if more participants can be added to the call */
    canAddMoreParticipants: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    showLabel: true,
    enableCaregivers: true,
    className: '',
    style: {},
  }

  state = {
    showMenu: false,
    showAlert: false,
  }

  toggleMenu = () => {
    if (this.props.canAddMoreParticipants) {
      this.setState({ showMenu: !this.state.showMenu })
    } else {
      this.setState({ showAlert: !this.state.showMenu })
    }
  }

  handleMenuClick = item => {
    this.setState({ showMenu: false })

    if (item === 'staff') this.props.onAddStaff()
    if (item === 'caregiver') this.props.onAddCaregiver()
    if (item === 'interpreter') this.props.onAddInterpreter()
  }

  handleClose = () => {
    this.setState({ showAlert: false })
  }

  render() {
    const { showLabel, enableCaregivers, enableInterpreters, style, className } = this.props
    const { showMenu, showAlert } = this.state

    const label = showLabel ? <CallButtonLabel text="Add Call" /> : null

    return (
      <div className={`addcallbutton-wrap ${className}`} style={style}>
        <AddCallMenu
          show={showMenu}
          enableCaregivers={enableCaregivers}
          enableInterpreters={enableInterpreters}
          onAddStaff={() => {
            this.handleMenuClick('staff')
          }}
          onAddCaregiver={() => {
            this.handleMenuClick('caregiver')
          }}
          onAddInterpreter={() => {
            this.handleMenuClick('interpreter')
          }}
          onBack={this.toggleMenu}
        />
        <ModalToast show={showAlert} data-testid="maximum-reached-modal">
          <div className="modalalert">
            <ModalToast.Header
              className="modalalert"
              title="'Sorry, the call is currently full. You can add someone after a caller has left'"
            />
            <ModalToast.Button fluid onClick={this.handleClose} />
          </div>
        </ModalToast>
        <div className={`addcallbutton-button `}>
          <CallButton
            color={Styles.brandcolorDark}
            name="add-call"
            ghost={true}
            ghostOpacity={0.6}
            onClick={this.toggleMenu}
            data-testid="button-add-call">
            <IconPlus />
          </CallButton>

          {label}
        </div>
      </div>
    )
  }
}
