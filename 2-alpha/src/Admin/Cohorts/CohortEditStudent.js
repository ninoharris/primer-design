import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { FlexVerticallyCenter, RaisedBox } from '../../components/Container'
import { PLight, P } from '../../components/Text'
import { CTAButton, SecondaryButton } from '../../components/Button'
import { SecondaryLink } from '../../components/Link'
import { Input } from '../../components/Input'

const Container = RaisedBox.extend`
  margin-bottom: 4px;
  padding: 0.7rem 1.2rem;
`
let Form = FlexVerticallyCenter.withComponent('form') // doing it in two lines because linter is mad about it for some reason (?)
Form = Form.extend`

`
const EditForm = styled.div`
  flex: 1;
  display: flex; /* Make the name input take up all remaining space */
  padding-right: 4rem; /* Margin doesnt work with flexbox, use padding instead to create left-2-right spacing */
  input {
    margin: 0 1rem;
    flex: 1;
  }
`

export class CohortEditStudent extends Component {
  constructor(props) {
    super(props)
      this.state = { fullName: props.fullName} // get fullname from props
  }
  handleChange = (e) => {
    this.setState({ fullName: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.props.studentID, this.state.fullName)
  }
  handleDelete = () => {
    const goAhead = window.confirm(`Are you sure you want to delete ${this.props.fullName} who has ${this.props.completedCount} exercises done? This cannot be undone`)
    if(goAhead) {
      this.props.deleteStudent(this.props.studentID)
    }
  }
  render() {
    const { studentID, completedCount, createdAt, cohortID, authorName } = this.props
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <EditForm>
            <P>{studentID}</P>
            <Input onChange={this.handleChange} value={this.state.fullName} />
            <SecondaryButton disabled={this.state.fullName === this.props.fullName}>Update name</SecondaryButton>
            <PLight>{completedCount} completed </PLight>
          </EditForm>
          <P>Created {moment(createdAt).format()} by {authorName}.</P>
          <SecondaryLink to={`/admin/cohorts/${cohortID}/students/${studentID}`}>View report</SecondaryLink>
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
  authorID: PropTypes.string.required, // Not needed for now TODO: add author name (not just id!)
}

export default CohortEditStudent