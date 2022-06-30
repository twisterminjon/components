import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { defaultTo } from 'lodash-es'

import { isPhoneNumberValid, parsePhoneNumber } from '@shared/helpers'

import ErrorMessages from '../../../ErrorMessages.json'
import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import TextInput from '../../Molecules/TextInput/TextInput'
import ConfirmButtons from '../../Molecules/ConfimButtons/ConfirmButtons'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'

import './PatientDetails.css'

const yupSchema = Yup.object().shape({
  pcpName: Yup.string()
    .max(255, 'You can only enter 255 characters')
    .when('required', (required, schema) =>
      required ? schema.required('Please enter primary care physician name') : schema
    ),
  careManagerName: Yup.string()
    .max(255, 'You can only enter 255 characters')
    .when('required', (required, schema) => (required ? schema.required('Please enter care manager name') : schema)),
  careManagerPhone: Yup.string()
    .test('isValid', 'Please enter a valid phone number', val => {
      return isPhoneNumberValid(val)
    })
    .when('required', (required, schema) => (required ? schema.required('Please enter care manager phone') : schema)),
})

export default class PatientTeam extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.string,
        pcpName: PropTypes.string,
        careManagerName: PropTypes.string,
        careManagerPhone: PropTypes.string,
      }),
    }).isRequired,
    /** Called to save changes to the BE */
    onSave: PropTypes.func.isRequired,
    /** If true, will show the form in a loading/saving state */
    loading: PropTypes.bool.isRequired,
    /** If true, all the fields gonna be required to fill */
    required: PropTypes.bool,
  }

  static defaultProps = {
    required: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      infoEditMode: false,
      currentPatientId: this.props.user.patient.id,
    }
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

  render() {
    const { user, onSave, loading, required } = this.props
    const { infoEditMode, currentPatientId } = this.state

    const editModeClass = infoEditMode ? 'patientdetails-row--editing' : ''

    const patient = user.patient

    const formattedPhone = parsePhoneNumber(patient.careManagerPhone, 'US').international
    const initialValues = {
      id: defaultTo(patient.id, 0),
      pcpName: defaultTo(patient.pcpName, ''),
      careManagerPhone: defaultTo(formattedPhone, ''),
      careManagerName: defaultTo(patient.careManagerName, ''),
      required: required,
    }

    return (
      <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        enableReinitialize={true}
        onSubmit={(values, formikBag) => {
          onSave({
            variables: {
              patientID: values.id,
              pcpName: values.pcpName,
              careManagerName: values.careManagerName,
              careManagerPhone: values.careManagerPhone,
            },
          })
            .then(() => {
              formikBag.resetForm()
              this.handleHideEditMode()
            })
            .catch(e => {
              if (e.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)) {
                formikBag.setErrors({
                  phone: "Phone number doesn't exist or is invalid",
                })
              } else {
                return Promise.reject(e)
              }
            })
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
          dirty,
          validateForm,
        }) => {
          if (currentPatientId !== values.id) {
            resetForm()
          }

          return (
            <Form className="patientdetails-section-wrap patientdetails-section-contact">
              <Prompt
                when={dirty}
                message="You have unsaved changes on this page. Click Ok to discard, or Cancel to stay here."
              />

              <React.Fragment>
                <PatientSectionTitle icon="team" text="Team" wrapStyle={{ marginTop: 0 }}>
                  <PatientButton
                    label="Edit"
                    icon="edit"
                    onClick={this.handleShowEditMode}
                    data-testid={`edit-button-team`}
                  />
                </PatientSectionTitle>

                <div className="patientdetails-section">
                  <fieldset disabled={loading} aria-busy={loading}>
                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="PCP Name"
                        name="pcpName"
                        autoFocus
                        value={values.pcpName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={!!errors.pcpName}
                        errorMessage={touched.pcpName && errors.pcpName}
                        displayOnly={!infoEditMode}
                        required={required}
                        data-testid="input-pcp-name"
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Care Manager Name"
                        name="careManagerName"
                        value={values.careManagerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={!!errors.careManagerName}
                        errorMessage={touched.careManagerName && errors.careManagerName}
                        displayOnly={!infoEditMode}
                        required={required}
                        data-testid="input-manager-name"
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <PhoneInput
                        label="Care Manager Phone"
                        name="careManagerPhone"
                        value={values.careManagerPhone}
                        onChange={e => setFieldValue('careManagerPhone', e)}
                        onValueInit={validateForm}
                        onBlur={handleBlur}
                        hasError={!!errors.careManagerPhone}
                        errorMessage={touched.careManagerPhone && errors.careManagerPhone}
                        displayOnly={!infoEditMode}
                        required={required}
                        key={`manager-phone-input-${infoEditMode}`} // trigger fully controlled component rerender on reset
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
