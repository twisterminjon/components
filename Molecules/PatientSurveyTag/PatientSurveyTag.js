import React, { Fragment, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import DeleteButtonTiny from '../../Atoms/DeleteButtonTiny/DeleteButtonTiny'

import IconSquareOpenSmall from '../../Atoms/Icons/IconSquareOpenSmall'
import IconSquareHalfFull from '../../Atoms/Icons/IconSquareHalfFull'
import IconEnvelope from '../../Atoms/Icons/IconEnvelope'
import IconArrowRight from '../../Atoms/Icons/IconArrowRight'

import ButtonIconSmall from '../../Atoms/ButtonIconSmall/ButtonIconSmall'

import Tag from '../Tag/Tag'

import './PatientSurveyTag.css'

PatientSurveyTag.propTypes = {
  /** The survey name */
  name: PropTypes.string.isRequired,
  /** The survey id */
  id: PropTypes.number.isRequired,
  /** The survey session id */
  surveySessionId: PropTypes.number,
  /** Whether or not the survey is active */
  active: PropTypes.bool.isRequired,
  /** Whether or not the survey is started */
  started: PropTypes.bool,
  /** Whether or not an intervention is required */
  interventionRequired: PropTypes.bool,
  /** Called after tag has been deleted */
  onTagDelete: PropTypes.func.isRequired,
  /** Called after intervention has been started */
  onIntervention: PropTypes.func.isRequired,
}

export default function PatientSurveyTag({
  name,
  id,
  surveySessionId,
  active,
  started,
  interventionRequired,
  onTagDelete,
  onIntervention,
  ...rest
}) {
  const Icon = useMemo(() => {
    if (interventionRequired) return IconEnvelope
    if (started) return IconSquareHalfFull

    return IconSquareOpenSmall
  }, [started, interventionRequired])

  const contentColor = useMemo(() => {
    if (interventionRequired) return 'var(--button_color_danger)'
    if (active) return 'var(--button_color_enabled)'

    return 'var(--button_color_disabled)'
  }, [active, interventionRequired])

  const handleIntervention = useCallback(() => {
    onIntervention(surveySessionId)
  }, [onIntervention, surveySessionId])

  return (
    <Tag
      label={name}
      id={id}
      inActive={!active}
      onDelete={(id, name) => onTagDelete(id, name)}
      fluid={true}
      style={{ marginBottom: 6, marginRight: 0 }}
      data-testid={`patientsurvey-${name}`}
      ContentView={({ id, label, onDelete }) => (
        <Fragment>
          <span className="tag-text">
            <span data-testid={`patientsurvey-icon-${name}`} className="patientsurveytag-icon">
              <Icon size={14} color={contentColor} />
            </span>{' '}
            <span data-testid={`patientsurvey-text-${name}`}>{name}</span>
          </span>
          {surveySessionId !== undefined && (
            <span>
              {!interventionRequired ? (
                <DeleteButtonTiny
                  onClick={() => onDelete(surveySessionId, label)}
                  data-testid={`patientsurvey-delete-${name}`}
                  className="tag-button"
                />
              ) : (
                <ButtonIconSmall
                  Icon={IconArrowRight}
                  iconProps={{ color: 'var(--button_color_danger)' }}
                  onClick={handleIntervention}
                />
              )}
            </span>
          )}
        </Fragment>
      )}
      {...rest}
    />
  )
}
