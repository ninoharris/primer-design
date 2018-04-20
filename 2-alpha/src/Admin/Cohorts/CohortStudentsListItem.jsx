import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getPercent } from '../../api'

import { RaisedBox } from '../../components/Container'
import { Summary, CommonMistakes } from '../../components/SummaryTags'
import { PNoMargins } from '../../components/Text'
import { SecondaryLink } from '../../components/Link'
import { HighlightButton } from '../../components/Button';

const LinkShownIfHovered = SecondaryLink.extend`
  visibility: 1;
`

const Container = RaisedBox.extend`
  padding: 0.4rem 1rem;
  margin-bottom: 0.3rem;
  &:hover {
    ${LinkShownIfHovered} {
      visibility: 1;
    }
  }
  .row {
    display: flex;
    align-items: center;
  }
`
const ActionsContainer = styled.div`
  text-align: right;
`




class CohortStudentsListItem extends Component {
  state = {
    showDetails: false,
  }
  toggleShowDetails = () => {
    this.setState(({ showDetails }) => ({ showDetails: !showDetails }))
  }
  render() {
    const { 
      fullName, studentID, cohortID, 
      completedCount, unfinishedCount, unattemptedCount, totalExercisesCount,
      attemptsCount = {}
    } = this.props
    const attemptsList = []
    for(const attempt in attemptsCount) {
      attemptsList.push([attempt, attemptsCount[attempt]])
    }
    return (
      <Container>
        <div className="row">
          <div className="col-2">
            <PNoMargins><strong>{fullName}</strong></PNoMargins>
            <PNoMargins>{studentID}</PNoMargins>
          </div>
          <div className="col-2">
            <Summary val={completedCount} text={`${getPercent(completedCount, totalExercisesCount)}%`} />
          </div>
          <div className="col-2">
            <Summary val={unfinishedCount} text={`${getPercent(unfinishedCount, totalExercisesCount)}%`} />
          </div>
          <div className="col-2">
            <Summary val={unattemptedCount} text={`${getPercent(unattemptedCount, totalExercisesCount)}%`} />
          </div>
          <div className="col-1">
          </div>
          <ActionsContainer className="col-3">
            <LinkShownIfHovered to={`/admin/cohorts/${cohortID}/manage`}>Edit student</LinkShownIfHovered>{' '}
            <HighlightButton onClick={this.toggleShowDetails}>{this.state.showDetails ? 'Hide':'View'} details</HighlightButton>
          </ActionsContainer>
        </div>
        {this.state.showDetails ? (
          <div>
            <PNoMargins><strong>Common mistakes made by {fullName}:</strong></PNoMargins>
            <CommonMistakes attemptsCount={attemptsList} />
          </div>
        ): ''}
      </Container>
    )
  }
}
CohortStudentsListItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  studentID: PropTypes.string.isRequired,
  cohortID: PropTypes.string.isRequired,
  completedCount: PropTypes.number.isRequired,
  unfinishedCount: PropTypes.number.isRequired,
  unattemptedCount: PropTypes.number.isRequired,
  totalExercisesCount: PropTypes.number.isRequired,
}

export default CohortStudentsListItem