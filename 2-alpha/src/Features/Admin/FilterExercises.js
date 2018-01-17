import React from 'react'
import { connect } from 'react-redux'
import { updateExerciseFilter } from '../../actions/admin'
import { filterTextSelector, sortOrderSelector, sortBySelector} from '../../selectors'

const FilterExercises = (props) => {
  const updateFilter = (e) => {
    props.updateExerciseFilter(e.target.value)
  }
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <label className="input-group-text">Filter/Sort exercises by</label>
      </div>
      <input type="text" className="form-control" value={props.filterText} onChange={updateFilter} />
      <select className="custom-select" value={props.sortBy}>
        <option value="date_added">Date added</option>
        <option value="last_modified">Last modified</option>
        <option value="author">Author</option>
        <option value="id">ID</option>
      </select>
      <select className="custom-select" value={props.sortOrder}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    filterText: filterTextSelector(state)
  }
}

export default connect(mapStateToProps, { updateExerciseFilter })(FilterExercises)