import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FlexVerticallyCenter, RaisedBox } from '../../components/Container'
import { PLight, P } from '../../components/Text'
import { CTAButton } from '../../components/Button'
import { SecondaryLink } from '../../components/Link'
import { Input } from '../../components/Input'

const Container = RaisedBox.extend`
  margin-bottom: 4px;
  padding: 6px;
`
const Form = FlexVerticallyCenter.withComponent('form').extend`
`

export class CohortEditStudent extends Component {
  constructor(props) {
    super(props)
      this.state = { fullName: props.fullName}
  }
  handleChange = (e) => {
    this.setState({ fullName: e.target.value })
  }
  handleSubmit = () => {
    this.props.handleSubmit()
  }
  handleDelete = () => {
    const goAhead = window.confirm(`Are you sure you want to delete ${this.props.fullName} who has ${this.props.completedCount} exercises done? This cannot be undone`)
    if(goAhead) {
      this.props.deleteStudent(this.props.studentID)
    }
  }
  render() {
    const { studentID, fullName, completedCount, createdAt, cohortID } = this.props
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <P>{studentID}</P>
            <Input onChange={this.handleChange} value={this.state.fullName} />
            <PLight>{completedCount} completed </PLight>
          </div>
          <P>Created {createdAt}.</P>
          <SecondaryLink to={`/admin/cohorts/${cohortID}/students/${studentID}`}>View peport</SecondaryLink>
          <CTAButton onClick={this.handleDelete}>Delete student</CTAButton>
        </Form>
      </Container>
    )
  }
}
CohortEditStudent.propTypes = {
  studentID: PropTypes.string.required,
  cohortID: PropTypes.string.required,
  onSubmit: PropTypes.func.required,
  onDelete: PropTypes.func.required,
  fullName: PropTypes.string.required,
  completedCount: PropTypes.string.required,
  createdAt: PropTypes.number.required,
  // authorID: PropTypes.string.required, // Not needed for now TODO: add author name (not just id!)
}

export default CohortEditStudent