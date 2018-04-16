import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// selectors and actions
import { fetchCohort, updateRecentCohort } from '../../actions/admin'
import { getCohort, getStudents } from '../../selectors/admin'
import msgs from '../../selectors/evaluator-messages'

// components
import AdminHeader from '../AdminHeader'
import CohortStudentsList from './CohortStudentsList'
import { RaisedBox, FlexVerticallyCenter } from '../../components/Container'
import { SecondaryLink, HighlightLink } from '../../components/Link'
import { TitleNoMargins } from '../../components/Text'
import { SummaryWithLink, CommonMistake } from '../../components/SummaryTags'

const Container = styled.div`
`

const Main = RaisedBox.extend`
  margin-top: 10px;
  padding: 1.2rem 1rem 0.7rem;
`
const SummaryContainer = styled.div`
  display: flex;
`

const P = styled.p`
  color: ${p => p.theme.black};
  margin-bottom: 0.2rem;
`

export class CohortPage extends Component {
  componentDidMount () {
    this.props.fetchCohort(this.props.cohortID)
    this.props.updateRecentCohort(this.props.cohortID)
  }
  render() {
    const { ready, cohort = {}, cohortID, summary } = this.props
    if(!ready) return <div>Loading...</div>
    return (
      <Container>
        <AdminHeader title={`${cohort.cohortName}: Students reports`}>
          <HighlightLink to={`/admin/cohorts/${cohortID}/manage`}>Manage students and cohort</HighlightLink>
          <SecondaryLink to={`/admin/cohorts/${cohortID}/exercises/manage`}>Manage assigned exercises</SecondaryLink>
        </AdminHeader>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Main>
                <SummaryContainer>
                  <SummaryWithLink text="Completed students" val={summary.completedCount} url={`/admin/cohorts/${cohortID}/reports&completed_only=true`} />
                  <SummaryWithLink text="Started but unfinished" val={summary.unfinishedCount} url={`/admin/cohorts/${cohortID}/reports&unfinished=true`} />
                  <SummaryWithLink text="Not yet started" val={summary.notStartedCount} url={`/admin/cohorts/${cohortID}/reports&not_started=true`} />
                </SummaryContainer>
                <P>Common mistakes shared by the cohort</P>
                {summary.attemptsCount.sort((a, b) => b[1] - a[1]).map((i) => {
                  const attemptID = i[0], count = i[1]
                  const text = msgs[attemptID]().adminTitle || msgs[attemptID]().title || 'unknown mistake...'
                  return <CommonMistake key={text} val={count} text={text} />
                })}
              </Main>
            </div>
            <div className="col-12">
              <CohortStudentsList cohortID={cohortID} studentIDs={cohort.studentIDs} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const cohortID = ownProps.match.params.id
  const cohort = getCohort(state, { cohortID })

  if(!cohort) return { 
    cohortID, 
    ready: false 
  } // not loaded yet
  const students = getStudents(state, { studentIDs: cohort.studentIDs })
  let completedCount = 0
  let unfinishedCount = 0
  let notStartedCount = 0
  const totalExercisesCount = _.size(cohort.exerciseIDs)
  for(const studentID in students) {
    const student = students[studentID]
    if(student.summary && student.summary.unfinishedCount) {
      unfinishedCount++
    } else if (student.summary && student.summary.completedCount === totalExercisesCount) {
      completedCount++
    } else {
      notStartedCount++
    }
  }

  const summary = {
    ...cohort.summary,
    unfinishedCount,
    completedCount,
    notStartedCount,
  }

  return {
    cohortID,
    cohort,
    summary,
    ready: true,
  }
}

export default connect(mapStateToProps, { fetchCohort, updateRecentCohort })(CohortPage)