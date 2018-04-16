export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    return JSON.parse(serializedState) 
  } catch (e) {
    return undefined
  }
}

export const saveState = (state) => {
  const { formInputs, showCodons, showAdminEvaluation, showLoggedInExercisesOnly, currentStudentID, recentCohort } = state
  const savedState = {
    formInputs,
    showCodons,
    currentStudentID,
    showLoggedInExercisesOnly,
    showAdminEvaluation,
    recentCohort,
  }
  const serializedState = JSON.stringify(savedState, null)
  window.localStorage.setItem('state', serializedState)
}