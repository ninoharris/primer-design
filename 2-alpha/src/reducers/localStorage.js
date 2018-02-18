export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    return JSON.parse(serializedState) 
  } catch (e) {
    return undefined
  }
}

export const saveState = (state) => {
  const { formInputs, showCodons, showLoggedInExercisesOnly, currentStudentID } = state
  const savedState = {
    formInputs,
    showCodons,
    currentStudentID,
    showLoggedInExercisesOnly,
  }
  const serializedState = JSON.stringify(savedState, null)
  window.localStorage.setItem('state', serializedState)
}