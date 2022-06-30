import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { defaultTo, find } from 'lodash-es'

import ErrorMessages from '../../../ErrorMessages.json'
import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import TextInput from '../../Molecules/TextInput/TextInput'
import DropdownList from '../../Molecules/DropdownList/DropdownList'
import ContactTypes from '../../Molecules/ContactTypes/ContactTypes'
import ConfirmButtons from '../../Molecules/ConfimButtons/ConfirmButtons'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'
import { isPhoneNumberValid, parsePhoneNumber } from '@shared/helpers'

import './PatientDetails.css'

export default class PatientContact extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      emailOptOut: PropTypes.bool,
      smsOptOut: PropTypes.bool,
      patient: PropTypes.shape({
        id: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }).isRequired,
    /** A lookup list of languages to display in dropdown */
    languages: PropTypes.array.isRequired,
    /** Called to save changes to the BE */
    onSave: PropTypes.func.isRequired,
    /** If true, will show the form in a loading/saving state */
    loading: PropTypes.bool.isRequired,
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
    const { user, onSave, languages, loading } = this.props
    const { infoEditMode, currentPatientId } = this.state

    const editModeClass = infoEditMode ? 'patientdetails-row--editing' : ''

    const patient = user.patient

    // transform data from graphql into data the dropdown understands
    const languageLookup = languages.map(lang => {
      return {
        value: lang.id,
        text: lang.name,
        key: lang.id,
      }
    })

    const formattedPhone = parsePhoneNumber(user.phone, 'US').international
    const initialValues = {
      id: defaultTo(patient.id, 0),
      contactType: defaultTo(patient.contactType, ''),
      phone: defaultTo(formattedPhone, ''),
      email: defaultTo(user.email, ''),
      language: defaultTo(patient.language.id, ''),
    }

    const yupSchema = Yup.object().shape({
      contactType: Yup.string(),
      email: Yup.string()
        .email('Please provide a valid email address')
        .when('contactType', (contactType, schema) => {
          return contactType === 'EMAIL' || contactType === 'BOTH'
            ? schema.required('You must provide an email address')
            : schema
        }),
      phone: Yup.string()
        .test('isValid', 'Please enter a valid phone number', val => {
          return isPhoneNumberValid(val)
        })
        .when('contactType', (contactType, schema) => {
          return contactType === 'SMS' || contactType === 'BOTH'
            ? schema.required('You must provide a phone number for SMS messages')
            : schema
        }),
    })

    return (
      <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        enableReinitialize={true}
        onSubmit={(values, formikBag) => {
          // translate back to the BE language req.
          const language = find(languages, {
            id: values.language,
          })

          onSave({
            variables: {
              patientID: values.id,
              contactType: values.contactType,
              email: values.email,
              phone: values.phone,
              language: language.code,
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
                <PatientSectionTitle icon="contact" text="Communication Preferences" wrapStyle={{ marginTop: 0 }}>
                  <PatientButton
                    label="Edit"
                    icon="edit"
                    onClick={this.handleShowEditMode}
                    data-testid={`edit-button-communication-prefs`}
                  />
                </PatientSectionTitle>

                <div className="patientdetails-section">
                  <fieldset disabled={loading} aria-busy={loading}>
                    <div className={`patientdetails-row ${editModeClass}`}>
                      <ContactTypes
                        value={values.contactType}
                        onChange={e => {
                          return setFieldValue('contactType', e)
                        }}
                        onBlur={handleBlur}
                        displayOnly={!infoEditMode}
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        alertMessage={user.emailOptOut ? 'Does not receive notifications' : ''}
                        required={values.contactType === 'EMAIL' || values.contactType === 'BOTH'}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={!!errors.email}
                        errorMessage={touched.email && errors.email}
                        displayOnly={!infoEditMode}
                        data-testid="input-email"
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <PhoneInput
                        label="Phone"
                        name="phone"
                        alertMessage={user.smsOptOut ? 'Does not receive notifications' : ''}
                        required={values.contactType === 'SMS' || values.contactType === 'BOTH'}
                        value={values.phone}
                        onChange={e => {
                          // handleChange was updating values after a dupe phone found, just doing manually
                          setFieldValue('phone', e)
                        }}
                        onValueInit={validateForm}
                        onBlur={handleBlur}
                        hasError={!!errors.phone}
                        errorMessage={errors.phone}
                        displayOnly={!infoEditMode}
                        key={`phone-input-${infoEditMode}`} // trigger fully controlled component rerender on reset
                      />
                    </div>

                    <div className={`patientdetails-row ${editModeClass}`}>
                      <DropdownList
                        name="language"
                        label="Language"
                        placeholder="Select language"
                        onChange={(e, data) => {
                          const language = find(languageLookup, {
                            value: data.value,
                          })

                          return setFieldValue('language', language.value)
                        }}
                        value={values.language}
                        options={languageLookup}
                        fluid
                        search
                        selection
                        hasError={touched.language && errors.language}
                        errorMessage={touched.language && errors.language}
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
