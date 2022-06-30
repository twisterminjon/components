import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
// import { Prompt } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { find } from 'lodash-es'

import { isPhoneNumberValid, ProjectDate } from '@shared/helpers'

import ErrorMessages from '../../../ErrorMessages.json'
import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import TextInput from '../../Molecules/TextInput/TextInput'
import DateInput from '../../Molecules/DateInput/DateInput'
import ConfirmButtons from '../../Molecules/ConfimButtons/ConfirmButtons'
import ContactTypes from '../../Molecules/ContactTypes/ContactTypes'
import DropdownList from '../../Molecules/DropdownList/DropdownList'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'

import './PatientDetails.css'

const yupSchema = Yup.object().shape({
  identifier: Yup.string().required('Please enter an identifier'),
  displayName: Yup.string()
    .required('Please enter a name')
    .matches(/^[a-zA-Z0-9-+',_()[\] ]{3,50}$/, {
      message: "Must be at least 3 characters and can include letters, numbers, -, +, ', _, (), [], and ,",
    }),
  dateOfBirth: Yup.date().required('Please enter a valid of birth').typeError('Please enter a date of birth'),
  ssnLast4: Yup.string().matches(/^[0-9]{4}$/, {
    message: 'Please enter a 4-digit number',
  }),
  zipCode: Yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/, {
    message: 'Please enter a valid zip code',
  }),
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
  pcpName: Yup.string()
    .max(255, 'You can only enter 255 characters')
    .when('teamRequired', (teamRequired, schema) =>
      teamRequired ? schema.required('Please enter primary care physician name') : schema
    ),
  careManagerName: Yup.string()
    .max(255, 'You can only enter 255 characters')
    .when('teamRequired', (teamRequired, schema) =>
      teamRequired ? schema.required('Please enter care manager name') : schema
    ),
  careManagerPhone: Yup.string()
    .test('isManagerPhoneValid', 'Please enter a valid phone number', val => {
      return isPhoneNumberValid(val)
    })
    .when('teamRequired', (teamRequired, schema) =>
      teamRequired ? schema.required('Please enter care manager phone') : schema
    ),
})

export default class PatientNew extends Component {
  static propTypes = {
    /** The default language for the enterprise */
    enterpriseLanguage: PropTypes.string.isRequired,
    /** Enterprise Id */
    enterpriseId: PropTypes.string.isRequired,
    /** Call to save the new patient */
    onSave: PropTypes.func.isRequired,
    /** Call when canceled */
    onCancel: PropTypes.func.isRequired,
    /** If true, will show a validation message for dupe identifier number */
    identifierDupe: PropTypes.bool,
    /** If true, will show in a loading state */
    loading: PropTypes.bool.isRequired,
    /** A lookup list of languages to display in dropdown */
    languages: PropTypes.array.isRequired,
    /** If true, all the team fields gonna be required to fill */
    teamRequired: PropTypes.bool,
  }
  static defaultProps = {
    identifierDupe: false,
    teamRequired: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPatientId: 'newId',
      generatedUsername: 'new_patient_' + dayjs(),
    }

    this.idInput = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.identifierDupe && this.props.identifierDupe !== prevProps.identifierDupe) {
      this.idInput.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
    }
  }

  render() {
    const { enterpriseLanguage, onSave, identifierDupe, loading, languages, enterpriseId, teamRequired } = this.props
    const { currentPatientId, generatedUsername } = this.state

    // transform data from graphql into data the dropdown understands
    const languageLookup = languages.map(lang => {
      return {
        value: lang.id,
        text: lang.name,
        key: lang.id,
        code: lang.code,
      }
    })

    // find the enterprise default language in the lookup list.
    const defaultLanguage = find(languageLookup, {
      code: enterpriseLanguage,
    })

    const initialValues = {
      id: currentPatientId,
      username: generatedUsername,
      password: 'HasNotBeenSet2018!',
      displayName: '',
      identifier: '',
      dateOfBirth: null,
      ssnLast4: '',
      zipCode: '',
      enterpriseId,

      // contact info
      contactType: 'BOTH',
      phone: '',
      email: '',
      language: defaultLanguage.value,
      pcpName: '',
      careManagerName: '',
      careManagerPhone: '',
      teamRequired,
    }

    return (
      <Formik
        validationSchema={yupSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        enableReinitialize={false}
        onSubmit={(values, formikBag) => {
          // translate back to the BE language req.
          const language = find(languages, {
            id: values.language,
          })

          onSave({
            variables: {
              username: values.username,
              password: values.password,
              identifier: values.identifier,
              dateOfBirth: values.dateOfBirth,
              displayName: values.displayName,
              zipCode: values.zipCode,
              enterpriseId: values.enterpriseId,
              ssnLast4: values.ssnLast4,

              pcpName: values.pcpName,
              careManagerName: values.careManagerName,
              careManagerPhone: values.careManagerPhone,

              contactType: values.contactType,
              email: values.email,
              phone: values.phone,
              language: language.code,
            },
          }).catch(e => {
            if (e.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)) {
              formikBag.setErrors({
                phone: "Phone number doesn't exist or is invalid",
              })
            }
          })
        }}
        render={({ values, errors, touched, handleChange, handleBlur, setFieldValue, resetForm, dirty }) => {
          if (currentPatientId !== values.id) {
            resetForm()
          }

          const sectionMargin = { marginTop: 40, marginBottom: 18 }

          return (
            <Form className="patientdetails-wrap">
              {/* <Prompt
                when={dirty}
                message="You have unsaved changes on this page. Click Ok to discard, or Cancel to stay here."
              /> */}
              <PatientSectionTitle icon="info" text="New Patient Personal Info" wrapStyle={sectionMargin} />
              <div className="patientdetails-section">
                {identifierDupe && (
                  <div className={'patientdetails-row patientdetails-row-dupe-id'}>
                    <p>A Patient already has that identifier assigned. Please choose a different one.</p>
                  </div>
                )}

                <fieldset disabled={loading} aria-busy={loading}>
                  <div className={`patientdetails-row patientdetails-row--editing`} ref={this.idInput}>
                    <TextInput
                      label="Identifier"
                      name="identifier"
                      autoFocus={true}
                      required={true}
                      value={values.identifier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={Boolean(errors.identifier) || identifierDupe}
                      errorMessage={touched.identifier && errors.identifier}
                      displayOnly={false}
                    />
                  </div>

                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <TextInput
                      label="Display Name"
                      name="displayName"
                      required={true}
                      value={values.displayName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={Boolean(errors.displayName)}
                      errorMessage={touched.displayName && errors.displayName}
                      displayOnly={false}
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
                    displayOnly={false}
                  />

                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <TextInput
                      label="Last 4 digits of SSN"
                      name="ssnLast4"
                      value={values.ssnLast4}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={Boolean(errors.ssnLast4)}
                      errorMessage={touched.ssnLast4 && errors.ssnLast4}
                      displayOnly={false}
                    />
                  </div>

                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <TextInput
                      label="Zip Code"
                      name="zipCode"
                      required={false}
                      value={values.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={Boolean(errors.zipCode)}
                      errorMessage={touched.zipCode && errors.zipCode}
                      displayOnly={false}
                    />
                  </div>
                </fieldset>
              </div>
              {/* ------------------------------
                           Team Details
                  ------------------------------ */}
              <PatientSectionTitle icon="team" text="Team" wrapStyle={sectionMargin} />
              <div className="patientdetails-section">
                <div className={`patientdetails-row patientdetails-row--editing`}>
                  <TextInput
                    label="PCP Name"
                    name="pcpName"
                    value={values.pcpName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={Boolean(errors.pcpName)}
                    errorMessage={touched.pcpName && errors.pcpName}
                    displayOnly={false}
                    required={teamRequired}
                  />
                </div>

                <div className={`patientdetails-row patientdetails-row--editing`}>
                  <TextInput
                    label="Care Manager Name"
                    name="careManagerName"
                    value={values.careManagerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={Boolean(errors.careManagerName)}
                    errorMessage={touched.careManagerName && errors.careManagerName}
                    displayOnly={false}
                    required={teamRequired}
                  />
                </div>

                <div className={`patientdetails-row patientdetails-row--editing`}>
                  <PhoneInput
                    label="Care Manager Phone"
                    name="careManagerPhone"
                    value={values.careManagerPhone}
                    onChange={e => setFieldValue('careManagerPhone', e)}
                    onBlur={handleBlur}
                    hasError={touched.careManagerPhone && !!errors.careManagerPhone}
                    errorMessage={touched.careManagerPhone && errors.careManagerPhone}
                    displayOnly={false}
                    required={teamRequired}
                  />
                </div>
              </div>
              {/* ------------------------------
                           Contact Details
                      -------------------------------- */}
              <PatientSectionTitle icon="contact" text="Communication Preferences" wrapStyle={sectionMargin} />
              <div className="patientdetails-section">
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <ContactTypes
                      value={values.contactType}
                      onChange={e => {
                        return setFieldValue('contactType', e)
                      }}
                      onBlur={handleBlur}
                      displayOnly={false}
                    />
                  </div>

                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <TextInput
                      label="Email"
                      type="email"
                      name="email"
                      required={values.contactType === 'EMAIL' || values.contactType === 'BOTH'}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={Boolean(errors.email)}
                      errorMessage={touched.email && errors.email}
                      displayOnly={false}
                    />
                  </div>

                  <div className={`patientdetails-row patientdetails-row--editing`}>
                    <PhoneInput
                      label="Phone"
                      name="phone"
                      required={values.contactType === 'SMS' || values.contactType === 'BOTH'}
                      value={values.phone}
                      onChange={e => {
                        // handleChange was updating values after a dupe phone found, just doing manually
                        setFieldValue('phone', e)
                      }}
                      onBlur={handleBlur}
                      hasError={touched.phone && !!errors.phone}
                      errorMessage={touched.phone && errors.phone}
                      displayOnly={false}
                    />
                  </div>

                  <div className={`patientdetails-row patientdetails-row--editing`}>
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
                      displayOnly={false}
                    />
                  </div>

                  <ConfirmButtons
                    onCancel={() => {
                      resetForm()
                      this.props.onCancel()
                    }}
                    dirty={dirty}
                  />
                </fieldset>
              </div>
            </Form>
          )
        }}
      />
    )
  }
}
