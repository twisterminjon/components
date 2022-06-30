import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class PatientsRedirect extends Component {
  render() {
    return <Redirect to="/app/patients/-1" push />
  }
}
