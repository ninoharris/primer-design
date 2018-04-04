import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { fetchCohort, updateCohortName } from '../../actions/admin'
import { getCohort } from '../../selectors/admin'

import AdminHeader from '../AdminHeader'
import CohortEditStudents from './CohortEditStudents'
import { P, PLight, BigTitle, Title } from '../../components/Text'
import { CTAButton } from '../../components/Button'
import SimpleForm from '../../components/SimpleForm'
import { RaisedBox } from '../../components/Container'
import AddCohortStudent from './AddCohortStudent';


const Container = styled.div`
`

const BlockMargin = styled.div`
  margin-bottom: 3rem;
`

export class CohortManagePage extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    this.props.fetchCohort(this.props.match.params.id).then(() => {
      this.setState({ ready: true })
    })
  }
  deleteCohort = () => {
    this.props.history.push('/admin')
  }
  updateName = (name) => {
    this.props.updateCohortName(this.props.match.params.id, name)
  }
 render() {
   if(!this.state.ready) return <div>Fetching cohort data...</div>
   const { cohort = {}, } = this.props
   const { cohortName = '', studentIDs = {}} = cohort
   return (
     <Container>
      <AdminHeader title={`${cohortName}: manage students and cohort`}>
        <CTAButton onClick={this.deleteCohort}>Delete cohort and its students</CTAButton>
      </AdminHeader>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Title>Change cohort admin details</Title>
            <BlockMargin>
              <RaisedBox>
                <SimpleForm onSubmit={this.updateName} text={`${cohortName}`} submitText={'Update cohort name'} />
              </RaisedBox>
            </BlockMargin>
            <BlockMargin>
              <CohortEditStudents studentIDs={studentIDs} cohortName={cohortName} cohortID={this.props.match.params.id} />
            </BlockMargin>
            <BlockMargin>
              <AddCohortStudent cohortID={this.props.match.params.id} />
            </BlockMargin>  
          </div>
        </div>
      </div>
     </Container>
   )
  }
}

const mapStateToProps = (state, ownProps) => {
  const cohortID = ownProps.match.params.id
  return {
    cohort: getCohort(state, { cohortID }),
  }

}
const mapDispatchToProps = (dispatch) => ({
  fetchCohort: (id) => dispatch(fetchCohort(id)),
  updateCohortName: (id, name) => dispatch(updateCohortName(id, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CohortManagePage)