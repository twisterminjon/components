import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import ModalYesNoToast from '../../Molecules/ModalYesNoToast/ModalYesNoToast'
import CaregiverSectionList from '../../Molecules/CaregiverSectionList/CaregiverSectionList'
import CaregiverMenu from '../../Organisms/CaregiverMenu/CaregiverMenu'
import { featureSecureMessages, featureVirtualCalls, featureOnDemandMessages, featureAllowCodes } from '@shared/helpers'

import debug from 'debug'
const d = debug('project:CaregiverSectionMgr')

export default class CaregiverSectionMgr extends Component {
  static propTypes = {
    /** The user object for the patient this is related to */
    patientUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    /** The patient (user type) assigned to this displayed caregivers */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    /** An array of caregivers currently assigned */
    caregivers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        sendProgramEvents: PropTypes.bool.isRequire,
        user: PropTypes.shape({
          displayName: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          profileImage: PropTypes.string.isRequired,
          overallStatus: PropTypes.string.isRequired,
          isActive: PropTypes.bool.isRequired,
        }).isRequired,
      })
    ).isRequired,
    /** Called after the odm button is clicked */
    onOdm: PropTypes.func.isRequired,
    /** Called after the call button is clicked */
    onCall: PropTypes.func.isRequired,
    /** Called after the message button is clicked */
    onMessage: PropTypes.func.isRequired,
    /** Called after a caregiver is confirmed to be removed */
    onRemove: PropTypes.func.isRequired,
    /** Called after the resend invite is clicked */
    onResend: PropTypes.func.isRequired,
    /** Called after change send options Event */
    onChangeSendOptions: PropTypes.func.isRequired,
    /** Called after a request to edit the caregiver, args(caregiver object) */
    onEdit: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    className: '',
    style: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      showMenu: false,
      showDeleteConfirmation: false,
      userToDeleteId: '',
      userToDeleteName: '',
      resendLoading: false,
      currentCaregiver: undefined, // used to hold the caregiver currently being acted on
    }

    this.handleRemoveCaregiver = this.handleRemoveCaregiver.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // handle any error delete ids (edge case where a caregiver is removed by
    // me, then added back by someone else, so the id is hanging around)
    if (this.props.caregivers !== prevProps.caregivers) {
      this.setState({ userToDeleteId: '' })
    }
  }

  handleShowMenu = cg => {
    d(`showing menu for caregiver id=${cg.id} user=%O`, cg)

    this.setState({
      showMenu: true,
      currentCaregiver: cg,
    })
  }

  handleHideMenu = () => {
    d(`hiding menu`)

    this.setState({ showMenu: false, currentCaregiver: undefined })
  }

  handleRemoveCaregiver = () => {
    // find the selected caregiver
    const caregiver = this.props.caregivers.filter(cg => cg.id === this.state.currentCaregiver.id)[0]

    this.setState({
      showDeleteConfirmation: true,
      userToDeleteName: caregiver.user.displayName,
      userToDeleteId: caregiver.id,
      showMenu: false,
      currentCaregiver: undefined,
    })
  }

  removeCaregiver = () => {
    d(`removing caregiver id=${this.state.userToDeleteId}`)

    this.setState({
      showDeleteConfirmation: false,
    })

    this.props.onRemove(this.state.userToDeleteId)
  }

  hideConfirmation = () => {
    this.setState({
      showDeleteConfirmation: false,
      showAddConfirmation: false,
      currentCaregiver: undefined,
      userToDeleteId: '',
    })
  }

  handleResend = () => {
    const cg = this.state.currentCaregiver
    d(`calling resend for id ${cg.id}`)

    this.setState({ resendLoading: true })

    this.props.onResend(cg.id).then(res => {
      d(`resend success`)

      this.setState({ resendLoading: false })
      toast.success(`Invite has been sent to ${cg.user.displayName}`)

      this.handleHideMenu()
    })
  }

  handleChangeSendOptions = val => {
    const cg = this.state.currentCaregiver
    d(`calling message opt in for id ${cg.id}`)

    this.props.onChangeSendOptions(cg.id, val)
    toast.success(`Program Event Communication Opt-In ${cg.user.displayName}`)
    this.handleHideMenu()
  }

  handleEdit = () => {
    this.props.onEdit(this.state.currentCaregiver)
  }

  render() {
    const { patientUser, user, caregivers, onOdm, onCall, onMessage, style, className } = this.props
    const {
      showMenu,
      showDeleteConfirmation,
      userToDeleteId,
      userToDeleteName,
      resendLoading,
      currentCaregiver,
    } = this.state
    return (
      <React.Fragment>
        {/* Menu */}
        <CaregiverMenu
          show={showMenu}
          user={(currentCaregiver && currentCaregiver.user) || null}
          onResend={this.handleResend}
          onChangeSendOptions={this.handleChangeSendOptions}
          onEdit={this.handleEdit}
          onUnassign={this.handleRemoveCaregiver}
          onCancel={this.handleHideMenu}
          resendLoading={resendLoading}
          sendProgramEvents={this.state.currentCaregiver ? this.state.currentCaregiver.sendProgramEvents : false}
          canAccessCode={featureAllowCodes(user)}
        />

        {/* Delete confirmation */}
        <ModalYesNoToast
          show={showDeleteConfirmation}
          title={`Do you want to remove ${userToDeleteName} as a Caregiver?`}
          message={`They will no longer receive messages or calls on behalf of ${user.displayName}.`}
          confirmButtonText="Remove"
          rejectButtonText="Keep"
          onConfirm={this.removeCaregiver}
          onReject={this.hideConfirmation}
          defaultIsConfirm={false}
        />

        <div className={className} style={style}>
          <CaregiverSectionList
            patientUser={patientUser}
            caregivers={caregivers}
            onOdm={onOdm}
            onCall={onCall}
            onMessage={onMessage}
            onMenu={this.handleShowMenu}
            loadingId={userToDeleteId}
            canOdm={featureOnDemandMessages(user)}
            canMessage={featureSecureMessages(user)}
            canCall={featureVirtualCalls(user)}
          />
        </div>
      </React.Fragment>
    )
  }
}
