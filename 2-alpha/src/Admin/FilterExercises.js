import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateExerciseFilter, updateSortBy, updateShowOwnExercises } from '../actions/admin'
import { filterTextSelector, sortOrderSelector, sortBySelector, showLoggedInExercisesOnly} from '../selectors/admin'

import Toggle from '../components/Toggle'
import { RaisedBox, Row } from '../components/Container'
import { SearchContainer, SearchOption, LabelText } from '../components/Input'

const Container = styled.div`

`

// const CheckboxContainer = styled



const ExerciseListFilters = (props) => {
  const updateFilter = (e) => {
    props.updateExerciseFilter(e.target.value)
  }
  const updateSortBy = (e) => {
    props.updateSortBy(e.target.value)
  }
  const updateShowLoggedInOnly = (e) => {
    props.updateShowOwnExercises(e.target.checked)
  }
  return (
    <Container>
      <Row>
        <SearchContainer>
          <SearchOption>
            <input type="checkbox" checked={showLoggedInExercisesOnly} onChange={updateShowLoggedInOnly} id="show-logged-in-only" />
            <LabelText htmlFor="show-logged-in-only">Show only my exercises</LabelText>
          </SearchOption>
          <input type="text" value={props.filterText} onChange={updateFilter} placeholder={"Search exercises by question or author name"} />
        </SearchContainer>
      </Row>
      <Row>
        <select className="custom-select" value={props.sortBy} onChange={updateSortBy}>
          <option value="createdAt">Date added</option>
          <option value="lastModified">Last modified</option>
          <option value="authorId">Author</option>
          <option value="id">ID</option>
        </select>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    filterText: filterTextSelector(state),
    showLoggedInExercisesOnly: showLoggedInExercisesOnly(state),
  }
}

export default connect(mapStateToProps, { 
  updateExerciseFilter, 
  updateSortBy, 
  updateShowOwnExercises 
})(ExerciseListFilters)