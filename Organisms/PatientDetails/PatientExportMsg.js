import React from 'react'
import PropTypes from 'prop-types'

import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import Loader from '../../Atoms/Loader/Loader'

import './PatientDetails.css'

PatientExportMsg.propTypes = {
  /** Lazy Query to generate the PDF with the conversations between the patient and staff */
  getPatientThreadsPDF: PropTypes.func.isRequired,
  /** User id of the Patient */
  userId: PropTypes.string.isRequired,
  /** URL of the generated PDF */
  dataPDF: PropTypes.string,
  /** Loading of the call to generate PDF */
  loadingPDF: PropTypes.bool,
  /** Boolean if the file was already generated or not */
  generated: PropTypes.bool.isRequired,
  /** Function to handle when the file is generated */
  handleGeneration: PropTypes.func.isRequired,
}

export default function PatientExportMsg({
  getPatientThreadsPDF,
  userId,
  dataPDF,
  loadingPDF,
  generated,
  handleGeneration,
}) {
  const handleGeneratePDF = () => {
    const variables = { id: userId }
    getPatientThreadsPDF({ variables })
  }

  const handleDownload = data => {
    window.open(data, '_blank')
  }

  if (loadingPDF) return <Loader show={loadingPDF} label="Preparing PDF" />
  if (dataPDF && !generated) {
    handleGeneration()
    handleDownload(dataPDF)
  }
  return (
    <div className="patientdetails-section-wrap patientdetails-section-export">
      <PatientSectionTitle icon="flag" text="Export Secure Messages" wrapStyle={{ marginTop: 0 }}></PatientSectionTitle>

      <div className="patientdetails-section">
        <PatientButton
          label="Download PDF"
          icon="plus"
          onClick={handleGeneratePDF}
          data-testid={`patientdetails-generatePDF`}
        />
      </div>
    </div>
  )
}
