import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateExerciseFilter, updateSortBy, updateShowOwnExercises } from '../actions/admin'
import { filterTextSelector, sortOrderSelector, sortBySelector, showLoggedInExercisesOnly, getFilteredSortedExercisesCount} from '../selectors/admin'
import { exercisesListSelector } from '../selectors'

import { Row as RowBasic } from '../components/Container'
import { SearchContainer, SearchOption, LabelText } from '../components/Input'
import { Checkbox } from '../components/Checkbox';
import { PNoMargins } from '../components/Text'

const Row = RowBasic.extend`
  margin-bottom: 1rem;
`

const Container = styled.div`
  &&& p {
    margin: 0;
  }
`
const FilterOptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  > * {
    margin-left: 0.7rem;
  }
`

const ExerciseListFilters = ({ 
  showOptions = true,
  updateExerciseFilter,
  updateSortBy,
  updateShowOwnExercises,
  sortBy,
  filterText,
  filteredExercisesCount,
  allExercisesCount,
  showLoggedInExercisesOnly
}) => {
  const updateFilter = (e) => {
    updateExerciseFilter(e.target.value)
  }
  const updateShowLoggedInOnly = (e) => {
    updateShowOwnExercises(e.target.checked)
  }
  const summaryText = () => {
    if (filterText) return `Found ${filteredExercisesCount} exercises out of ${allExercisesCount} containing '${filterText}'.`
    if (showLoggedInExercisesOnly) return `Displaying ${filteredExercisesCount} exercises created by you.`
    return `Displaying all ${allExercisesCount} exercises in database by all users.`
  }
  return (
    <Container>
      <Row>
        <SearchContainer>
          <SearchOption>
            <input type="checkbox" defaultChecked={showLoggedInExercisesOnly} onChange={updateShowLoggedInOnly} id="show-logged-in-only" />
            <LabelText htmlFor="show-logged-in-only">Show only my exercises</LabelText>
          </SearchOption>
          <input type="text" value={filterText} onChange={updateFilter} placeholder={"Search exercises by question or author name"} />
        </SearchContainer>
      </Row>
      {showOptions ?
      <Row>
        <PNoMargins>{summaryText()}</PNoMargins>
        <FilterOptionsContainer>
          <Checkbox onChange={() => updateSortBy('createdAt')} name="createdAt" label="Sort by recently created" value={sortBy === 'createdAt'} />
          <Checkbox onChange={() => updateSortBy('lastModified')} name="lastModified" label="Sort by recently updated" value={sortBy === 'lastModified'} />
          <Checkbox onChange={() => updateSortBy('authorId')} name="authorId" label="Sort by author" value={sortBy === 'authorId'} />
        </FilterOptionsContainer>
      </Row>
      : ''}
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    filterText: filterTextSelector(state),
    showLoggedInExercisesOnly: showLoggedInExercisesOnly(state),
    filteredExercisesCount: getFilteredSortedExercisesCount(state),
    allExercisesCount: exercisesListSelector(state).length,
  }
}

export default connect(mapStateToProps, { 
  updateExerciseFilter, 
  updateSortBy, 
  updateShowOwnExercises 
})(ExerciseListFilters)