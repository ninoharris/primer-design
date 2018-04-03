import React from 'react'
import { reduxForm,  Field, } from 'redux-form'

const CohortEditor = ({ 
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cohortName">Cohort Name</label>
      <Field name="cohortName" component="input" type="text" />
    </form>
  )
}

export default reduxForm({
  form: 'cohort',
})(CohortEditor)