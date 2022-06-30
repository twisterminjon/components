import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { defaultTo } from 'lodash-es'

import { ProjectDate } from '@shared/helpers'

import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import TextInput from '../../Molecules/TextInput/TextInput'
import DateInput from '../../Molecules/DateInput/DateInput'
import ConfirmButtons from '../../Molecules/ConfimButtons/ConfirmButtons'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import './PatientDetails.css'

export default class PatientInfo extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      profileImage: PropTypes.string,
      patient: PropTypes.shape({
        id: PropTypes.string,
        identifier: PropTypes.string,
        dateOfBirth: PropTypes.string,
        ssnLast4: PropTypes.string,
        zipCode: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }).isRequired,
    /** Call to save the new patient */
    onSave: PropTypes.func.isRequired,
    /** If true, will show the form in a loading/saving state */
    loading: PropTypes.bool.isRequired,
    /** Called to send an invite to a patient */
    onSendInvite: PropTypes.func.isRequired,
    /** True if the sendInvite is in flight */
    sendInviteLoading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    identifierDupe: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      infoEditMode: false,
      currentPatientId: this.props.user.patient.id,
      showError: false,
      identifierDupe: false,
      error: {},
    }

    this.inputError = React.createRef()

    this.handleDupe = this.handleDupe.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.patient.id !== this.props.user.patient.id) {
      this.setState({
        infoEditMode: false,
        currentPatientId: this.props.user.patient.id,
      })
    }
  }

  handleShowEditMode = () => {
    this.setState({ infoEditMode: true })
  }

  handleHideEditMode = () => {
    this.setState({ infoEditMode: false })
  }

  handleDupe() {
    this.setState({ identifierDupe: true })

    // scroll into view if hidden
    const elem = this.inputError.current.getBoundingClientRect()
    if (elem.top < 0) {
      this.inputError.current.scrollIntoView()
    }
  }

  handleSubmit(values, formikBag) {
    this.props
      .onSave({
        variables: {
          patientID: values.id,
          identifier: values.identifier,
          dateOfBirth: values.dateOfBirth,
          displayName: values.displayName,
          ssnLast4: values.ssnLast4,
          zipCode: values.zipCode,
        },
      })
      .then(data => {
        // success
        formikBag.resetForm()
        this.handleHideEditMode()
      })
      .catch(error => {
        if (error.message && error.message.startsWith('GraphQL error: Patient exists for identifier ')) {
          this.handleDupe()
        } else {
          this.setState({ showError: true, error: error })
        }
      })
  }

  render() {
    const { user, loading, sendInviteLoading, onSendInvite } = this.props
    const { infoEditMode, currentPatientId, identifierDupe, showError, error } = this.state

    const editModeClass = infoEditMode ? 'patientdetails-row--editing' : ''

    const patient = user.patient

    const initialValues = {
      id: defaultTo(patient.id, 0),
      displayName: defaultTo(user.displayName, ''),
      identifier: defaultTo(patient.identifier, ''),
      dateOfBirth: defaultTo(patient.dateOfBirth),
      ssnLast4: defaultTo(patient.ssnLast4, ''),
      zipCode: defaultTo(patient.zipCode, ''),
    }

    const yupSchema = Yup.object().shape({
      identifier: Yup.string().required('Please enter an identifier'),
      displayName: Yup.string()
        .required('Please enter a name')
        .matches(/^[a-zA-Z0-9-+',_()[\] ]{3,50}$/, {
          message: "Must be at least 3 characters and can include letters, numbers, -, +, ', _, (), [], and ,",
        }),
      dateOfBirth: Yup.date('test').required('Please enter a date of birth'),
      ssnLast4: Yup.string().matches(/^[0-9]{4}$/, {
        message: 'Please enter a 4-digit number',
      }),
      zipCode: Yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/, {
        message: 'Please enter a valid zip code',
      }),
    })

    // Handle any errors from the mutation
    if (showError) {
      return <ErrorPage error={error} />
    }

    return (
      <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        enableReinitialize={true}
        onSubmit={(values, formikBag) => {
          this.handleSubmit(values, formikBag)
        }}
        render={({ values, errors, touched, handleChange, handleBlur, setFieldValue, resetForm, dirty }) => {
          if (currentPatientId !== values.id) {
            resetForm()
          }

          return (
            <Form className="patientdetails-section-wrap patientdetails-section-info">
              <Prompt
                when={dirty}
                message="You have unsaved changes on this page. Click Ok to discard, or Cancel to stay here."
              />

              <React.Fragment>
                <PatientSectionTitle
                  icon="info"
                  text="Personal Info"
                  wrapStyle={{ marginBottom: 18 }}
                  showEditButton={true}
                  onEditClick={this.handleShowEditMode}>
                  <PatientButton
                    label="Edit"
                    icon="edit"
                    onClick={this.handleShowEditMode}
                    data-testid={`edit-button-personal-ingo`}
                  />
                  <PatientButton
                    label="Resend Invite"
                    icon="envelope"
                    onClick={onSendInvite}
                    style={{ marginLeft: 10 }}
                    loading={sendInviteLoading}
                    data-testid="button-resend-invite"
                  />
                </PatientSectionTitle>

                <div className="patientdetails-section">
                  <fieldset disabled={loading} aria-busy={loading}>
                    {identifierDupe && (
                      <div ref={this.inputError} className={'patientdetails-row patientdetails-row-dupe-id'}>
                        <p>A Patient already has that identifier assigned. Please choose a different one.</p>
                      </div>
                    )}
                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Identifier"
                        name="identifier"
                        autoFocus={true}
                        required={true}
                        value={values.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={Boolean(errors.identifier)}
                        errorMessage={touched.identifier && errors.identifier}
                        displayOnly={!infoEditMode}
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Display Name"
                        name="displayName"
                        required={true}
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={Boolean(errors.displayName)}
                        errorMessage={touched.displayName && errors.displayName}
                        displayOnly={!infoEditMode}
                      />
                    </div>

                    <DateInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder={'MM/DD/YYYY'}
                      required={true}
                      value={values.dateOfBirth}
                      onChange={date => {
                        const dateOfBirth = date ? ProjectDate(date).format() : ''
                        setFieldValue('dateOfBirth', dateOfBirth)
                      }}
                      onHandleChangeRaw={this.handleRawDate}
                      hasError={touched.dateOfBirth && !!errors.dateOfBirth}
                      errorMessage={touched.dateOfBirth && errors.dateOfBirth}
                      displayOnly={!infoEditMode}
                    />

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Last 4 digits of SSN"
                        name="ssnLast4"
                        value={values.ssnLast4}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={Boolean(errors.ssnLast4)}
                        errorMessage={touched.ssnLast4 && errors.ssnLast4}
                        displayOnly={!infoEditMode}
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Zip Code"
                        name="zipCode"
                        required={false}
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={Boolean(errors.zipCode)}
                        errorMessage={touched.zipCode && errors.zipCode}
                        displayOnly={!infoEditMode}
                      />
                    </div>

                    {infoEditMode && (
                      <ConfirmButtons
                        onCancel={() => {
                          this.handleHideEditMode()
                          resetForm()
                        }}
                        dirty={dirty}
                      />
                    )}
                  </fieldset>
                </div>
              </React.Fragment>
            </Form>
          )
        }}
      />
    )
  }
}
