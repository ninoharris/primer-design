import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link as UnstyledLink} from 'react-router-dom'
import styled from 'styled-components'

import * as paths from '../../api/paths'

import { Title, PLight } from '../../components/Text'
import { HighlightLink, Link } from '../../components/Link'
import { RaisedBox, FlexVerticallyCenter } from '../../components/Container'

const ListItem = styled.li`
  
`
const Header = FlexVerticallyCenter.extend`
`

const Main = RaisedBox.extend`
  margin-top: 10px;
  padding: 14px;
`

const LeftFillWidth = styled.div`
  flex: 1;
`

const CohortsListItem = ({ cohortID, cohortName, authorFullName, exerciseIDs = {}, studentIDs = {}, createdDate = Date.now() }) => (
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