import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components';

import { updateSortBy } from '../actions/admin'

import ExerciseListItem from './ExerciseListItem'
import { P } from '../components/Text'

const Container = styled.ul`
  > li {
    margin-bottom: 1rem;
  }
`

const ExerciseList = ({ 
  exercisesList =[],
  children,
}) => (
    <Container>
      {exercisesList.length > 0 ?
        exercisesList.map(exercise => <ExerciseListItem {...exercise} key={exercise.id} children={children} />) :
        <P>No exercises found...</P>
      }
    </Container>
)

ExerciseList.propTypes = {
  exercisesList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(null, {
  updateSortBy
})(ExerciseList)
