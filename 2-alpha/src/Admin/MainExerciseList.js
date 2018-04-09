import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getFilteredSortedExercises } from '../selectors/admin'

import ExerciseListItem from './ExerciseListItem';
import { HighlightLink, SecondaryLink } from '../components/Link'

const Ul = styled.ul`
  > li {
    margin-bottom: 1rem;
  }
`

const MainExerciseList = ({ exercisesList }) => {
  return (
    <Ul>
      {exercisesList.map(exercise => (
        <ExerciseListItem {...exercise}>
          {/* <SecondaryLink className="btn btn-primary" to={'/play/' + exercise.id}>Demo</SecondaryLink> */}
          {/* TODO: allow demos in state */}
          <HighlightLink className="btn btn-primary" to={`/admin/exercises/edit/${exercise.id}`}>Edit exercise</HighlightLink>
        </ExerciseListItem>
      ))}
    </Ul>
  )
}

const mapStateToProps = (state) => ({
  exercisesList: getFilteredSortedExercises(state)
})

export default connect(mapStateToProps)(MainExerciseList)