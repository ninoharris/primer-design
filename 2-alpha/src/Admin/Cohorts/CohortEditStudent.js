import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { formatDate } from '../../api'

import { FlexVerticallyCenter, RaisedBox } from '../../components/Container'
import { PLight, P } from '../../components/Text'
import { CTAButton, SecondaryButton } from '../../components/Button'
import { SecondaryLink } from '../../components/Link'
import { Input as InputNormal } from '../../components/Input'

const Container = RaisedBox.extend`
  margin-bottom: 4px;
`
let Form = FlexVerticallyCenter.withComponent('form') // doing it in two lines because linter is mad about it for some reason (?)
Form = Form.extend`
  padding: 0.4rem 0.8rem;
`
const EditForm = styled.div`
  flex: 1;
  display: flex; /* Make the name input take up all remaining space */
  input {
    margin: 0 1rem;
    flex: 1;
  }
`
const OtherActions = styled.div`
  > * {
    display: inline-block;
  }
`

const Input = InputNormal.extend`
  box-shadow: rgba(0,0,0,0.12) 0 1px 1px 0;
  border-radius: 3px;
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
    const goAhead = window.confirm(
      `Are you sure you want to delete ${this.props.fullName}${this.props.completedCount ? `who has ${this.props.completedCount} exercises done` : ''}? This cannot be undone`
    )
    if(goAhead) {
      this.props.handleDelete(this.props.studentID)
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
            {this.state.fullName !== this.props.fullName ? <SecondaryButton>Confirm name change</SecondaryButton> : ''}
            <PLight>{completedCount ? `${completedCount}` : 'None'} completed</PLight>
          </EditForm>
          <P>Created <strong>{formatDate(createdAt)}</strong> by <strong>{authorName}</strong></P>
          <SecondaryLink to={`/admin/cohorts/${cohortID}/students/${studentID}`}>View report</SecondaryLink>
          <CTAButton onClick={this.handleDelete}>Delete student</CTAButton>
        </Form>
      </Container>
    )
  }
}
CohortEditStudent.propTypes = {
  studentID: PropTypes.string.isRequired,
  cohortID: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  completedCount: PropTypes.number,
  createdAt: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired, // Not needed for now TODO: add author name (not just id!)
}

export default CohortEditStudent