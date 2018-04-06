import _ from 'lodash'
import { } from '../../api'
import React from 'react'
import PropTypes from 'prop-types'
import { Link as UnstyledLink} from 'react-router-dom'
import styled from 'styled-components'

import * as paths from '../../api/paths'

import { Title, PLight } from '../../components/Text'
import { HighlightLink, Link } from '../../components/Link'
import { RaisedBox, FlexVerticallyCenter } from '../../components/Container'
import { SummaryWithLink, CommonMistake } from '../../components/SummaryTags'

import msgs from '../../selectors/evaluator-messages'

const ListItem = styled.li`
  
`
const Header = FlexVerticallyCenter.extend`
`

const Main = RaisedBox.extend`
  margin-top: 10px;
  padding: 1.2rem 1rem 0.7rem;
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const LeftFillWidth = styled.div`
  flex: 1;
`

const SummaryContainer = styled.div`
  display: flex;
`

const CommonMistakesContainer = styled.div`
`
const P = styled.p`
  color: ${p => p.theme.black};
  margin-bottom: 0.2rem;
`

const CohortsListItem = ({ cohortID, cohortName, authorFullName, exerciseIDs = {}, studentIDs = {}, createdDate = Date.now(), summary = {} }) => (
  <ListItem>
    <Header>
      <LeftFillWidth>
        <Title>{cohortName}</Title>
      </LeftFillWidth>
      <div>
        <HighlightLink to={paths.getCohortURL(cohortID)}>View all students</HighlightLink>
        <Link to={`/admin/cohorts/${cohortID}/manage`}>Manage cohort and students</Link>
        <PLight><strong>{_.size(studentIDs)} students enrolled</strong></PLight>
      </div>
    </Header>
    <Main>
      <SummaryContainer>
        <SummaryWithLink text="Completed students" val={summary.completedCount} url={`/admin/cohorts/${cohortID}/reports&completed_only=true`} />
        <SummaryWithLink text="Started but unfinished" val={summary.unfinishedCount} url={`/admin/cohorts/${cohortID}/reports&unfinished=true`} />
        <SummaryWithLink text="Not yet started" val={summary.notStartedCount} url={`/admin/cohorts/${cohortID}/reports&not_started=true`} />
      </SummaryContainer>
      <CommonMistakesContainer>
        <P>Common mistakes shared by the cohort</P>
        {summary.attemptsCount.map((i) => {
          const attemptID = i[0], count = i[1]
          const text = msgs[attemptID]().adminTitle || msgs[attemptID]().title || 'unknown mistake...'
          return <CommonMistake val={count} text={text} />
        })}
      </CommonMistakesContainer>
      <FlexVerticallyCenter>
        <LeftFillWidth>
          <PLight>{cohortID}, '{cohortName}', was created by <strong>{authorFullName}</strong> on {createdDate}.</PLight>
        </LeftFillWidth>
        <div>
          <HighlightLink to={paths.getCohortManageExercisesURL(cohortID)}>Manage attached exercises</HighlightLink>
          <PLight><strong>{_.size(exerciseIDs)} Exercises total</strong></PLight>
        </div>
      </FlexVerticallyCenter>
    </Main>
  </ListItem>
)
CohortsListItem.propTypes = {
  cohort: PropTypes.objectOf({
    cohortID: PropTypes.string.isRequired,
    cohortName: PropTypes.string,
    authorID: PropTypes.string.isRequired,
    authorFullName: PropTypes.string.isRequired,
    studentIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    exerciseIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
}

export default CohortsListItem