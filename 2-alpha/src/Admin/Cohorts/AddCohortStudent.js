import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { addStudent } from '../../actions/admin'
import { getCurrentAuthorUid } from '../../selectors/admin'

import { FlexVerticallyCenter, RaisedBox } from '../../components/Container'
import { P } from '../../components/Text'
import { Input as InputNormal } from '../../components/Input';
import { HighlightButton } from '../../components/Button';

const Container = RaisedBox.extend`

`

let Form = FlexVerticallyCenter.withComponent('form')
Form = Form.extend`
  padding: 0.8rem;
  > div {
    display: flex;
    flex: 1;
  }
  input {
    flex: 1; /* Inputs take up full width */
  }
`

const AddingStudentMessage = styled.div`

`

const Input = InputNormal.extend`
  box-shadow: rgba(0,0,0,0.12) 0 1px 1px 0;
  border-radius: 3px;
  flex: 1;
`

export class AddCohortStudent extends Component {
  state = {
    username: '',
    fullName: '',
    addingStudent: false
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.username.trim() === '' || this.state.fullName.trim() === '') return
    this.setState({ addingStudent: true })
    this.props.addStudent(this.props.cohortID, this.props.authorID, this.state.username, this.state.fullName).then(() => {
      this.setState({ username: '', fullName: '', addingStudent: false })
    })
  }
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value })
  }
  handleFullNameChange = (e) => {
    this.setState({ fullName: e.target.value })
  }
  render() {
    const { fullName, username, addingStudent } = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <P>Username</P>
            <Input value={username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <P>Full name</P>
            <Input value={fullName} onChange={this.handleFullNameChange} />
          </div>
          <div>
            <HighlightButton>Add student</HighlightButton>
          </div>
        </Form>
        {addingStudent ?
          <AddingStudentMessage>{`Adding user '${fullName} (${username})'...`}</AddingStudentMessage> 
        : ''}
      </Container>
    )
  }
}

AddCohortStudent.propTypes = {
  authorID: PropTypes.string.isRequired,
  cohortID: PropTypes.string.isRequired,
  addStudent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  authorID: getCurrentAuthorUid(state)
})

export default connect(mapStateToProps, {
  addStudent,
})(AddCohortStudent)