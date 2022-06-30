import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { orderBy, uniqBy, differenceBy } from 'lodash-es'

import { apiErrorToString, AuthUtils } from '@shared/helpers'

import { AssessmentsApi } from '@shared/services'
import { getPollInterval } from '../../../config'
import ErrorMessages from '../../../ErrorMessages.json'

import PatientSurvey from './PatientSurvey'

import './PatientDetails.css'

export default class PatientSurveyContainer extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      patient: PropTypes.shape({
        id: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
        roles: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.surveysPollTimer = null

    this.state = {
      allSurveys: [], // a list of all available surveys
      userSurveys: [], // a list of surveys currently assigned to the patient
      activeInterventionSessionId: null,
      surveyToUnassign: null,
      surveyToAssign: null,
      assigningSurveys: [],
    }

    // Use this flag to stop API calls from trying to update state after component unmounts.
    //
    // FIXME: If continuing to use REST API for the foreseeable future, add a custom
    // hook & HOC which uses AbortController to stop currently running Axios queries.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    this.isUnmounting = false
  }

  componentDidMount() {
    this.fetchSurveys()

    this.surveysPollTimer = setInterval(() => {
      this.fetchSurveys()
    }, getPollInterval('surveys'))
  }

  componentDidUpdate(prevProps, prevState) {
    // Force survey refetch any time active intervention changes, in order to
    // keep remote-client states in sync.
    //
    // This seems to correct an issue where surveys were sometimes not
    // appearing in the patient profile until a refresh has been made.
    const { activeInterventionSessionId } = this.props
    const { prevActiveInterventionSessionId } = prevState
    if (activeInterventionSessionId !== prevActiveInterventionSessionId) {
      this.fetchSurveys()
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true

    clearInterval(this.surveysPollTimer)
  }

  /**
   * Get a list of assignable surveys from the list of all available ones
   *
   * @param {array} assigned - A list of currently assigned surveys
   * @param {array} allSurveys - A list of all available surveys
   *
   * @return {array} a list of surveys that can be assigned to the user
   */
  getAssignableSurveys = (assigned = [], all = []) => {
    const assignable = all.filter(({ id: surveyId }) => !assigned.some(us => us.id === surveyId && !us.isComplete))

    return assignable
  }

  getUserSurveys = (userSurveys, assigningSurveys) => {
    return orderBy(userSurveys.concat(assigningSurveys), 'name')
  }

  /**
   * Retrieves all user and enterprise surveys and sets local state.
   *
   * @return {Promise<void>} (Surveys are set as local state, instead of being
   * returned here.)
   */
  fetchSurveys = async () => {
    try {
      if (this.isUnmounting) {
        return
      }

      const { user } = this.props

      this.setState({ loading: true })

      // Fetch surveys in parallel
      // FIXME: Add cancellation token to internal Axios calls to stop queries
      // from running if component is unmounting
      const [allSurveysResp, userSurveysResp] = await Promise.all([
        AssessmentsApi.getAllSurveys(user.enterprise.id),
        AssessmentsApi.getUserSurveysWithInterventions(user.id),
      ])

      if (this.isUnmounting) {
        return
      }

      const userSurveys = userSurveysResp.data.data.surveys
      const allSurveys = allSurveysResp.data.data.enterprise.surveys || []
      const newSurveys = differenceBy(userSurveys, this.state.userSurveys, 'surveySessionId')

      this.setState(state => ({
        allSurveys,
        userSurveys,
        assigningSurveys: differenceBy(state.assigningSurveys, newSurveys, 'id'),
        initialLoaded: true,
      }))
    } catch (err) {
      console.error(err)
      this.props.history.push('/error', {
        code: 'ERROR',
        message: apiErrorToString(err),
      })
    } finally {
      this.setState({ loading: false })
    }
  }

  handleAssignSurvey = () => {
    const survey = this.state.surveyToAssign
    const surveyId = survey.id

    this.setState(state => ({
      surveyToAssign: null,
      showSelectPane: false,
      assigningSurveys: [...state.assigningSurveys, { ...survey, isActive: false }],
    }))

    const staffId = AuthUtils.getUserId()

    AssessmentsApi.assignSurvey(this.props.user.id, surveyId, staffId)
      .then(async resp => {
        this.setState(state => ({
          userSurveys: uniqBy([...state.userSurveys, resp.data], 'surveySessionId'),
          assigningSurveys: state.assigningSurveys.filter(s => s.id !== surveyId),
        }))
        // We need to refetch the surveys so all the state updates properly
        await this.fetchSurveys()
      })
      .catch(err => {
        this.setState(state => ({
          assigningSurveys: state.assigningSurveys.filter(s => s.id !== surveyId),
        }))
        if (this.state.assigningAssessmentId === surveyId) {
          if (err.response && err.response.data) {
            if (err.response.data.toUpperCase().includes(ErrorMessages.DUPE.toUpperCase())) {
              toast.info('The assessment is already been assigned to this patient')
              return
            }
          }

          console.error(err)
          this.props.history.push('/error', {
            code: 'ERROR',
            message: apiErrorToString(err),
          })
        }
      })
  }

  handleUnassignSurvey = () => {
    const sessionId = this.state.surveyToUnassign.id
    this.setState({ unassignLoading: true, surveyToUnassign: null })

    AssessmentsApi.unassignSurvey(sessionId)
      .then(async resp => {
        await this.fetchSurveys()
        this.setState(state => ({
          unassignLoading: false,
          userSurveys: state.userSurveys.filter(s => s.surveySessionId !== sessionId),
        }))
      })

      .catch(err => {
        this.setState({ unassignLoading: false })
        if (err.response && err.response.data && err.response.data.includes('not found')) {
          toast.error('Assessment not found')
          this.fetchSurveys()
          return
        }
        console.error(err)
        this.props.history.push('/error', {
          code: 'ERROR',
          message: apiErrorToString(err),
        })
      })
  }

  handleIntervention = surveySessionId => {
    const { user } = this.props

    this.props.history.push(`/app/enterprises/${user.enterprise.id}/patientsV1/${user.id}/alerts/${surveySessionId}/`)

    this.setState({
      activeInterventionSessionId: surveySessionId,
    })
  }

  handleShowSelectPane = () => {
    this.setState({ showSelectPane: true })
  }

  handleSidebarClose = () => {
    this.setState({ showSelectPane: false })
  }

  handleSelectSurvey = (id, name) => {
    this.setState({ surveyToAssign: { id, name } })
  }

  handleDeleteSurvey = (id, name) => {
    this.setState({ surveyToUnassign: { id, name } })
  }

  hideConfirmation = () => {
    this.setState({ surveyToAssign: null, surveyToUnassign: null, showSelectPane: false })
  }

  render() {
    const {
      allSurveys,
      unassignLoading,
      initialLoaded,
      surveyToUnassign,
      surveyToAssign,
      loading: loadingMore,
      showSelectPane,
      userSurveys: serverUserSurveys,
      assigningSurveys,
    } = this.state
    const userSurveys = this.getUserSurveys(serverUserSurveys, assigningSurveys)
    const assignableSurveys = this.getAssignableSurveys(userSurveys, allSurveys)
    const loading = (loadingMore && !initialLoaded) || unassignLoading

    return (
      <PatientSurvey
        userSurveys={userSurveys}
        assignableSurveys={assignableSurveys}
        surveyToAssign={surveyToAssign}
        surveyToUnassign={surveyToUnassign}
        showSelectPane={showSelectPane}
        loading={loading}
        onShowSelectPane={this.handleShowSelectPane}
        onSelectSurvey={this.handleSelectSurvey}
        onAssignSurvey={this.handleAssignSurvey}
        onUnassignSurvey={this.handleUnassignSurvey}
        onHideConfirmation={this.hideConfirmation}
        onIntervention={this.handleIntervention}
        onSidebarClose={this.handleSidebarClose}
        onDeleteSurvey={this.handleDeleteSurvey}
      />
    )
  }
}
