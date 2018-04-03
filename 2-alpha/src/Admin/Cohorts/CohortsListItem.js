import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link as UnstyledLink} from 'react-router-dom'
import styled from 'styled-components'

import * as paths from '../../api/paths'

import { Title, PLight } from '../../components/Text'
import { HighlightLink, Link } from '../../components/Link'

const ListItem = styled.li`

`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Main = styled.div`
  background: ${p => p.theme.white};
  border-radius: 4px;
  box-shadow: rgba(0,0,0,0.12) 0 1px 1px 0;
  margin-top: 6px;
`

const CohortsListItem = ({ cohortID, cohortName, authorFullName, exerciseIDs = {}, studentIDs = {}, createdDate = Date.now() }) => (
  <ListItem className="list-group-item">
    <Header>
      <UnstyledLink to={paths.getCohortURL(cohortID)}><Title>{cohortName}</Title></UnstyledLink>
      <div>
        <HighlightLink to={paths.getCohortURL(cohortID)}>View all students</HighlightLink>
        <Link to={`/admin/cohorts/${cohortID}/manage`}>Manage cohort and students</Link>
        <PLight>{_.size(studentIDs)} students enrolled</PLight>
      </div>
    </Header>
    <Main>
      <PLight>{cohortID}, '{cohortName}', was created by <strong>{authorFullName}</strong> on {createdDate}.</PLight>
      <div>
        <HighlightLink to={paths.getCohortManageExercisesPath(cohortID)}>Manage attached exercises</HighlightLink>
        <PLight><strong>{_.size(exerciseIDs)}</strong></PLight>
      </div>
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