import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AuthUtils, apiErrorToString } from '@shared/helpers'

import { AssessmentsApi } from '@shared/services'

import Assessment from './Assessment'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

export default class AssessmentsContainer extends Component {
  static propTypes = {
    /** Count of current assigned surveys */
    surveyCount: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      surveys: undefined,
      showError: false,
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.getSurveys()
  }

  componentDidUpdate(prevProps) {
    if (this.props.surveyCount !== prevProps.surveyCount) {
      this.getSurveys()
    }
  }

  getSurveys = () => {
    this.setState({ loading: true })
    AssessmentsApi.getAllUserSurveys(AuthUtils.getUserId())
      .then(resp => {
        this.setState({
          loading: false,
          surveys: resp.data.data.surveys,
        })
      })
      .catch(err => {
        this.setState({
          showError: true,
          loading: false,
          error: apiErrorToString(err),
        })
      })
  }

  handleOpenSurvey = id => {
    this.props.history.push(`/app/surveys/${id}`)
  }

  render() {
    const { showError, error, loading, surveys } = this.state

    if (!surveys && loading) {
      return <SpinnerDots style={{ width: '100%', height: '100%' }} />
    }

    if (showError) {
      return <ErrorPage code="Assessment Error" message={error} />
    }

    return <Assessment surveys={surveys} onOpenSurvey={this.handleOpenSurvey} />
  }
}
