import React from 'react'
import { connect } from 'react-redux'
import { updateExerciseFilter, updateSortBy, updateShowOwnExercises } from '../actions/admin'
import { filterTextSelector, sortOrderSelector, sortBySelector, showLoggedInExercisesOnly} from '../selectors/admin'
import Toggle from '../components/Toggle'

const ExerciseListFilters = (props) => {
  const updateFilter = (e) => {
    props.updateExerciseFilter(e.target.value)
  }
  const updateSortBy = (e) => {
    props.updateSortBy(e.target.value)
  }
  const updateShowLoggedInOnly = (bool) => {
    props.updateShowOwnExercises(bool)
  }
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <Toggle
            on={showLoggedInExercisesOnly}
            onToggle={updateShowLoggedInOnly}
            aria-label="Show only my exercises" id="filter-exercises"
            className="col-4"
          >
            <Toggle.Button />
            <Toggle.Off>Show only my exercises</Toggle.Off>
            <Toggle.On>Showing only my exercises</Toggle.On>
          </Toggle>
        </div>
      </div>
      <input type="text" className="form-control" value={props.filterText} onChange={updateFilter} />
      <select className="custom-select" value={props.sortBy} onChange={updateSortBy}>
        <option value="createdAt">Date added</option>
        <option value="lastModified">Last modified</option>
        <option value="authorId">Author</option>
        <option value="id">ID</option>
      </select>
    </div>
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

export default connect(mapStateToProps, { updateExerciseFilter, updateSortBy, updateShowOwnExercises })(ExerciseListFilters)