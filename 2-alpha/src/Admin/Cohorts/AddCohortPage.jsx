import React, {Component} from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'
import styled from 'styled-components'

// selectors and actions
import { addCohort } from '../../actions/admin'

// components
import AdminHeader from '../AdminHeader'
import { RaisedBox, FlexVerticallyCenter } from '../../components/Container'
import { HighlightButton } from '../../components/Button'
import { TitleNoMargins } from '../../components/Text'
import { SummaryWithLink, CommonMistake } from '../../components/SummaryTags'
import { Input } from '../../components/Input';

const Container = styled.div`
`

const FormContainer = RaisedBox.extend`

`


export class AddCohortPage extends Component {
  state = {
    cohortName: ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.cohortName.trim() === '') return
    this.props.addCohort({ cohortName: this.state.cohortName }).then((cohortID) => {
      this.props.history.push(`/admin/cohorts/${cohortID}/exercises/manage`)
    })
  }
  handleCohortNameChange = (e) => {
    this.setState({ cohortName: e.target.value })
  }
  render() {
    return (
      <Container>
        <AdminHeader title={`Add cohort`}>
        </AdminHeader>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <FormContainer>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor='cohort-name' >Cohort name:</label>
                  <Input id='cohort-name' value={this.state.cohortName} onChange={this.handleCohortNameChange} />
                  <HighlightButton type='submit'>Add Cohort</HighlightButton>
                </form>
              </FormContainer>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}
export default connect(null, { 
  addCohort,
})(AddCohortPage)