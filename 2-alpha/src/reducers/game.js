export const game = (state = {}, action) => {
  switch(action.type) {
  default: return state
  }
}

export const loading = (state = true, action) => {
  switch (action.type) {
    case 'FETCH_EXERCISES_INIT':
      return true
    case 'SELECT_EXERCISE':
      return false
    default: return state
  }
}

export const showCodons = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_CODONS':
      return action.payload
    default: return state
  }
}

export const evaluationDisplayToggle = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EVALUATION':
    return action.payload
    default: return state
  }
}