import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getPercent } from '../../api'

import { RaisedBox } from '../../components/Container'
import { Summary, CommonMistakes } from '../../components/SummaryTags'
import { PNoMargins, PLight } from '../../components/Text'
import { SecondaryLink } from '../../components/Link'
import { HighlightButton } from '../../components/Button';

const LinkShownIfHovered = SecondaryLink.extend`
  visibility: 1;
`

const Container = RaisedBox.extend`
  padding: 0.2rem 1rem;
  margin-bottom: 0.3rem;
  &:hover {
    ${LinkShownIfHovered} {
      visibility: 1;
    }
  }
`
const Row = styled.div`
  
`
const Col = styled.div`
  flex: 1;
  &:last-child {
    text-align: right;
    flex: 3;
  }
`



class CohortStudentsListItem extends Component {
  state = {
    showDetails: false,
  }
  render() {
    const { 
      fullName, studentID, cohortID, 
      completedCount, unfinishedCount, unattemptedCount, totalExercisesCount,
      attemptsCount = {}
    } = this.props
    return (
      <Container>
        <div className="row">
          <div className="col-2">
            <PNoMargins>{fullName}</PNoMargins>
            <PLight>{studentID}</PLight>
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
          <div className="col-3">
            <LinkShownIfHovered to={`/admin/cohorts/${cohortID}/manage`}>Edit student</LinkShownIfHovered>{' '}
            <HighlightButton onClick={() => this.setState({ showDetails: true })}>View details</HighlightButton>
          </div>
        </div>
        {this.state.showDetails ? (
          <div>
            <PNoMargins>Common mistakes made by {fullName}:</PNoMargins>
            {/* <CommonMistakes attemptsCount={_.flatMap(attemptsCount} /> */}
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