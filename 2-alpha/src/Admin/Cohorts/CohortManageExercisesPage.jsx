import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { fetchCohort } from '../../actions/admin'
import { getCohort } from '../../selectors/admin'

import AdminHeader from '../AdminHeader'
import { P, Title } from '../../components/Text'
import { HighlightLink } from '../../components/Link'
import CohortExerciseList from './CohortExerciseList'
import AddCohortExercise from './AddCohortExercise'
import FilterExercises from '../FilterExercises';

const Container = styled.div`
`
const Segment = styled.div`
  margin-bottom: 2rem;
`

export class CohortManageExercisesPage extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    this.props.fetchCohort(this.props.cohortID).then(() => {
      this.setState({ ready: true })
    })
  }
  updateName = (name) => {
    this.props.updateCohortName(this.props.cohortID, name)
  }
 render() {
   if(!this.state.ready) return <div>Fetching cohort data...</div>
   const { cohort = {}, cohortID } = this.props
   const { cohortName = '', studentIDs = {}} = cohort
   return (
     <Container>
      <AdminHeader title={`${cohortName}: manage exercises`}>
        <HighlightLink to={`/admin/cohorts/${cohortID}/manage`}>Manage cohort students and cohort name</HighlightLink>
      </AdminHeader>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Segment>
              <P><strong>Showing all {Object.keys(cohort.exerciseIDs).length} assigned exercises to “{cohortName}”...</strong></P>
              <CohortExerciseList  exerciseIDs={cohort.exerciseIDs} cohortID={cohortID} />
            </Segment>

             <Segment>
               <Title>Assign exercises to cohort</Title>
               <FilterExercises showOptions={false} />
             </Segment>

            <Segment>
              <AddCohortExercise cohortID={cohortID} />
            </Segment>

            <Segment>
              <HighlightLink to={`/admin/cohorts/${cohortID}`}>Finish assigning exercises</HighlightLink>
            </Segment>
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
    cohortID,
    cohort: getCohort(state, { cohortID }),
  }
}

export default connect(mapStateToProps, {
  fetchCohort,
})(CohortManageExercisesPage)