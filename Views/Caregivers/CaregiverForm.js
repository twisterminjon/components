import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from 'semantic-ui-react'

import { AuthUtils, urlAddMode, isPhoneNumberValid, parsePhoneNumber } from '@shared/helpers'

import TextInput from '../../Molecules/TextInput/TextInput'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'
import ConfirmButtons from '../../Molecules/ConfimButtons/ConfirmButtons'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ErrorMessages from '../../../ErrorMessages.json'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './CaregiverForm.css'

import debug from 'debug'
const d = debug('project:CaregiversForm')

export default class CaregiverForm extends Component {
  static propTypes = {
    /** The user to add */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string,
      contactType: PropTypes.string.isRequired,
      caregiver: PropTypes.shape({
        id: PropTypes.string.isRequired,
        patients: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            displayName: PropTypes.string,
            isActive: PropTypes.bool,
          })
        ),
      }).isRequired,
    }),
    /* patient to assign caregiver */
    patient: PropTypes.shape({
      id: PropTypes.string.isRequired,
      enterprise: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    /** A profile form can show a loading state. */
    loading: PropTypes.bool,
    /** Called after saving the form when adding */
    onSave: PropTypes.func.isRequired,
  }
  static defaultProps = {
    loading: false,
    phone: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      error: {},
      phoneDupe: false,
    }

    this.formFocusField = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values, { setErrors, resetForm }) {
    const data = {
      enterpriseId: AuthUtils.getEnterpriseId(),
      isCaregiver: true,
      displayName: values.displayName,
      contactType: values.contactType,
      email: values.email,
      phone: values.phone,
    }

    // handle adding vs editing
    if (values.id === '-1') {
      // we are adding
      data.patientUserId = this.props.match.params.patientId
      data.username = ''
      data.password = ''
      data.enterpriseId = this.props.patient.enterprise.id
    } else {
      // editing
      data.id = this.props.user.caregiver.id
    }

    d('submitting with values= %O', data)

    this.props
      .onSave({ variables: data })
      .then(() => {
        // success
        resetForm()
        const { history, match } = this.props
        const { patientId } = match.params

        const enterpriseId = data.enterpriseId
        history.push(`/app/enterprises/${enterpriseId}/patientsV1/${patientId}`)
      })
      .catch(error => {
        d('submit failed, error= %O', error)

        if (error.message.includes(ErrorMessages.Create.CAREGIVER_DUPE_PHONE)) {
          setErrors({ phone: 'Another user already has that phone number' })
        } else if (error.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)) {
          setErrors({ phone: 'Phone number does not exist or is invalid' })
        } else {
          this.setState({ showError: true, error: error })
        }
      })
  }

  handleCancel = () => {
    d('canceled, going back')
    this.props.history.goBack()
  }

  render() {
    const { user, style, loading } = this.props
    const { showError, error } = this.state

    // Handle any errors from the mutation
    if (showError) {
      return <ErrorPage error={error} />
    }

    const adding = urlAddMode(this.props.location.pathname)
    // const phone = this.props.match.params.phone

    const formattedPhone = parsePhoneNumber(user.phone, 'US').international
    const initialValues = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      phone: formattedPhone,
      contactType: user.contactType,
    }

    const yupSchema = Yup.object().shape({
      displayName: Yup.string()
        .min(3, 'Display name must be at least 3 characters')
        .max(255, 'Display name cannot be longer than 255 characters')
        .required('You must provide a display name'),
      email: Yup.string()
        .email('Please provide a valid email address')
        .when('contactType', (contactType, schema) => {
          return contactType === 'BOTH' ? schema.required('You must provide an email address') : schema
        }),
      phone: Yup.string()
        .test('isValid', 'Please enter a valid phone number', val => {
          return isPhoneNumberValid(val)
        })
        .required('You must provide a phone number for SMS messages'),
      contactType: Yup.string(),
    })

    return (
      <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={(values, formikBag) => {
          this.handleSubmit(values, formikBag)
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
          validateForm,
          dirty,
        }) => {
          return (
            <Form style={style} data-testid="caregiver-form" className="caregiverform">
              <Prompt
                when={dirty}
                message="You have unsaved changes on this page. Click Ok to discard, or Cancel to stay here."
              />

              <DocTitle title={adding ? 'New Caregiver' : 'Edit Caregiver'} />

              {adding && (
                <div className="caregiverform-intro">
                  <h1>Create a new Caregiver</h1>
                  <p>
                    Once a caregiver has been created, they will be notified of their new account and you will be able
                    to assign them to patients.
                  </p>
                </div>
              )}
              <div className="caregiverform--column">
                <TextInput
                  label="Name"
                  name="displayName"
                  required={true}
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={touched.displayName && !!errors.displayName}
                  errorMessage={errors.displayName}
                />
              </div>

              <div className="caregiverform--row">
                <span className="sr-only">
                  {values.contactType === 'BOTH' ? 'contact by text and email' : 'contact by text only'}
                </span>
                <Button.Group
                  style={{
                    height: 36,
                    minWidth: 240,
                    maxWidth: 240,
                    marginRight: 16,
                  }}>
                  <Button
                    positive={values.contactType === 'BOTH'}
                    onClick={e => {
                      validateForm()
                      return setFieldValue('contactType', 'BOTH')
                    }}
                    type="button"
                    className="brand-button-pos-neg">
                    Text & Email
                  </Button>
                  <Button.Or />
                  <Button
                    positive={values.contactType === 'SMS'}
                    onClick={e => {
                      validateForm()
                      return setFieldValue('contactType', 'SMS')
                    }}
                    type="button"
                    className="brand-button-pos-neg">
                    Text Only
                  </Button>
                </Button.Group>

                <TextInput
                  label="Email"
                  name="email"
                  required={values.contactType === 'BOTH'}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={touched.email && !!errors.email}
                  errorMessage={errors.email}
                />

                <div style={{ width: 16, flexGrow: 0, flexShrink: 0 }} />
                <PhoneInput
                  label="Mobile Phone"
                  name="phone"
                  required={true}
                  value={values.phone}
                  onChange={e => {
                    // handleChange was updating values after a dupe phone found, just doing manually
                    setFieldValue('phone', e)
                  }}
                  onValueInit={() => {
                    // init validation only for editing caregiver
                    if (values.id !== '-1') {
                      validateForm()
                    }
                  }}
                  onBlur={handleBlur}
                  hintMessage="Caregiver must be able to install the Patient Portal app for mobile phone use."
                  hasError={touched.phone && !!errors.phone}
                  errorMessage={errors.phone}
                />
              </div>
              <ConfirmButtons
                style={{ maxWidth: '100%' }}
                loading={loading}
                onCancel={() => {
                  this.handleCancel()
                }}
              />
            </Form>
          )
        }}
      />
    )
  }
}
